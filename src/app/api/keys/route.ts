import { redisClient } from "@/app/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = await redisClient.keys("*");
    if (keys.length === 0) {
      return NextResponse.json({ message: "No keys found" });
    }
    const keysInfo = await Promise.all(
      keys.map(async (key) => {
        const type = await redisClient.type(key);
        const ttl = await redisClient.ttl(key);
        return { key, type, ttl, message: "success" };
      })
    );
    return NextResponse.json(keysInfo);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch keys ${error}` },
      { status: 500 }
    );
  }
}
