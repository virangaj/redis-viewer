// /app/api/connect/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

// Keep connection outside the handler (in-memory for now)
let redisClient: ReturnType<typeof createClient> | null = null;

export async function POST(req: NextRequest) {
  try {
    const { url, password } = await req.json();
    console.log("Connecting to Redis with URL:", url);
    // Close existing connection if needed
    if (redisClient) {
      await redisClient.quit();
    }

    redisClient = createClient({
      url,
      password,
    });

    redisClient.on("error", (err) => console.error("Redis Client Error", err));

    await redisClient.connect();

    return NextResponse.json({ success: true, message: "Connected to Redis" });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect",
        error: (err as Error).message,
      },
      { status: 400 }
    );
  }
}

// Export client for use in other APIs (not persistent across reloads)
export { redisClient };
