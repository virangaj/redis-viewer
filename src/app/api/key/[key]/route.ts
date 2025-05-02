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
    let data: unknown;
    logger.info(`Fetched key: ${key}`);

    switch (type) {
      case "string":
        data = await client.get(key);
        try {
          data = JSON.parse(data as string);
        } catch {
          // keep as plain string if not JSON
        }
        break;
      case "list":
        data = await client.lRange(key, 0, -1);
        break;
      case "hash":
        const hashData = await client.hGetAll(key);
        data = hashData["data"];
        break;
      case "set":
        data = await client.sMembers(key);
        break;
      case "zset":
        data = await client.zRangeWithScores(key, 0, -1);
        break;
      default:
        data = "Unsupported type or key not found";
    }

    // Extract options if available
    const options: Record<string, unknown> = {};
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      const optionKeys = [
        "processedOn",
        "finishedOn",
        "timestamp",
        "priority",
        "name",
        "returnvalue",
        "delay",
        "opts",
      ];
      for (const k of optionKeys) {
        if (Object.prototype.hasOwnProperty.call(data, k)) {
          options[k] = (data as Record<string, unknown>)[k];
        }
      }
    }

    const ttl = await client.ttl(key); // in seconds
    const memoryBytes = await client.memoryUsage(key); // in bytes

    const expireAt =
      ttl > 0 ? new Date(Date.now() + ttl * 1000).toISOString() : null;
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
      data,
      options: Object.keys(options).length > 0 ? options : null,
      ttl:
        ttl === -1
          ? "No expiry"
          : ttl === -2
          ? "Key not found"
          : `${ttl} seconds`,
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
