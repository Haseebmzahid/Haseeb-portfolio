import mongoose, { type Connection } from "mongoose";

/**
 * MongoDB connection utility for Next.js 14 App Router.
 *
 * In development, Next.js hot-reloads modules which would create a new
 * Mongoose connection on every reload. We cache the connection on the
 * Node.js `globalThis` object so it persists across hot reloads.
 *
 * In production, each serverless function cold-start creates one
 * connection that is reused for the lifetime of the function instance.
 *
 * @required  Set `MONGODB_URI` in `.env.local`
 *
 * @example
 * ```ts
 * import { connectDB } from "@/db/connect";
 *
 * export async function GET() {
 *   await connectDB();
 *   const data = await SomeModel.find();
 *   return Response.json(data);
 * }
 * ```
 */

/* ─────────────────────────────────────────────
   Global cache type
   ───────────────────────────────────────────── */
interface MongooseCache {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var _mongooseCache: MongooseCache | undefined;
}

/* ─────────────────────────────────────────────
   Cached connection
   ───────────────────────────────────────────── */
const cached: MongooseCache = globalThis._mongooseCache ?? {
    conn: null,
    promise: null,
};

if (!globalThis._mongooseCache) {
    globalThis._mongooseCache = cached;
}

/* ─────────────────────────────────────────────
   Connect function
   ───────────────────────────────────────────── */
export async function connectDB(): Promise<Connection> {
    // 1. Validate at runtime, not at module load (which breaks `next build`)
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error(
            "⚠️  MONGODB_URI is not defined.\n" +
            "   Add it to .env.local:\n" +
            "   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>"
        );
    }

    // 2. Return existing connection if already established
    if (cached.conn) {
        return cached.conn;
    }

    // 3. If a connection attempt is already in progress, await it
    if (!cached.promise) {
        console.log("🔄 Connecting to MongoDB...");

        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,  // Fail fast instead of queueing
            maxPoolSize: 10,        // Connection pool for concurrent requests
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((m) => {
                console.log("✅ MongoDB Connected Successfully");
                return m.connection;
            })
            .catch((err: Error) => {
                // Reset the cache so the next call retries
                cached.promise = null;
                console.error("❌ MongoDB Connection Failed:", err.message);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
