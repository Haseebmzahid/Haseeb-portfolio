import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact.schema";
import { connectDB } from "@/db/connect";
import Contact from "@/db/models/Contact.model";

/* ─────────────────────────────────────────────
   Simple in-memory rate limiter
   ───────────────────────────────────────────── */
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { count: 1, timestamp: now });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimit) {
        if (now - value.timestamp > RATE_LIMIT_WINDOW * 2) {
            rateLimit.delete(key);
        }
    }
}, 300_000);

/* ─────────────────────────────────────────────
   POST handler
   ───────────────────────────────────────────── */
export async function POST(request: Request) {
    try {
        // 0. Rate limit check
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many requests. Please try again in a minute.",
                },
                { status: 429 }
            );
        }

        // 1. Parse request body
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid request body." },
                { status: 400 }
            );
        }

        // 2. Validate with Zod
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            return NextResponse.json(
                { success: false, message: "Validation failed.", errors },
                { status: 400 }
            );
        }

        // 3. Connect to database
        await connectDB();

        // 4. Save to MongoDB
        await Contact.create(result.data);

        // 5. Return success
        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again later.",
            },
            { status: 500 }
        );
    }
}
