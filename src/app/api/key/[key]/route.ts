"use server";
import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client";
import { Logger } from "@/utils/logger";

const logger = await Logger({ prefix: "KEY_FETCH_API" });

export async function GET(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  try {
    const client = await getRedisClient();

    const type = await client.type(key);
    let value: unknown;
    logger.info(`Fetched key: ${key}`);

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

    const ttl = await client.ttl(key); // in seconds
    const memoryBytes = await client.memoryUsage(key); // in bytes

    // Formatting
    const expireAt = ttl > 0 ? new Date(Date.now() + ttl * 1000).toISOString() : null;
    const memoryUsageFormatted = memoryBytes
      ? memoryBytes < 1024
        ? `${memoryBytes} Bytes`
        : memoryBytes < 1024 * 1024
        ? `${(memoryBytes / 1024).toFixed(2)} KB`
        : `${(memoryBytes / (1024 * 1024)).toFixed(2)} MB`
      : "Unknown";

    await client.quit();

    return NextResponse.json({
      key,
      type,
      value,
      ttl: ttl === -1 ? "No expiry" : ttl === -2 ? "Key not found" : `${ttl} seconds`,
      expireAt,
      memoryUsage: memoryUsageFormatted,
    });
  } catch (error) {
    console.error("Redis fetch error:", error);
    return NextResponse.json(
      { error: `Failed to fetch key: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
