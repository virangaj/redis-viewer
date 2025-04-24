import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client";

export async function GET() {
  try {
    const client = await getRedisClient();
    const keys = await client.keys("*");

    const result = await Promise.all(
      keys.map(async (key) => {
        const type = await client.type(key);
        const ttl = await client.ttl(key);
        return { key, type, ttl };
      })
    );

    await client.quit();
    return NextResponse.json(
      { data: result, message: "success" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}
