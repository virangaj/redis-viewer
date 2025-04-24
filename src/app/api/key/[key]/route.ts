import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client"; // <- make sure this path is correct

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  try {
    // Get the Redis client instance
    const client = await getRedisClient();

    // Get the type of the key
    const type = await client.type(key);
    let value: unknown;

    // Retrieve the value based on the type of Redis key
    switch (type) {
      case "string":
        value = await client.get(key);
        break;
      case "list":
        value = await client.lRange(key, 0, -1);
        break;
      case "hash":
        value = await client.hGetAll(key);
        break;
      case "set":
        value = await client.sMembers(key);
        break;
      case "zset":
        value = await client.zRangeWithScores(key, 0, -1);
        break;
      default:
        value = "Unsupported type or key not found";
    }

    // Get TTL (time to live) of the key
    const ttl = await client.ttl(key);

    // Close Redis client connection
    await client.quit();

    // Return the data as JSON
    return NextResponse.json({
      key,
      type,
      value,
      ttl,
    });
  } catch (error) {
    console.error("Redis fetch error:", error);
    return NextResponse.json(
      { error: `Failed to fetch key: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
