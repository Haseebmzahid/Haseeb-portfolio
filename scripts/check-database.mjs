import mongoose from "mongoose";

// Read-only connectivity check. Never prints the URI or reads/writes contact records.
if (!process.env.MONGODB_URI) {
  console.log(
    JSON.stringify({
      configured: false,
      connected: false,
      reason: "MONGODB_URI is missing",
    }),
  );
  process.exitCode = 1;
} else {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    await mongoose.connection.db.admin().ping();
    console.log(
      JSON.stringify({
        configured: true,
        connected: true,
        ping: true,
        recordsWritten: 0,
      }),
    );
  } catch (error) {
    console.log(
      JSON.stringify({
        configured: true,
        connected: false,
        errorType: error.name,
        code: error.code ?? null,
        recordsWritten: 0,
      }),
    );
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
