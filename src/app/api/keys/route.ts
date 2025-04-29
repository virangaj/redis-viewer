"use server";
import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client";

function formatMemoryUsage(bytes: number | null) {
  if (bytes === null) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function GET() {
  try {
    const client = await getRedisClient();
    const keys = await client.keys("*");

    const result = await Promise.all(
      keys.map(async (key) => {
        const type = await client.type(key);
        const ttl = await client.ttl(key);
        const memoryBytes = await client.memoryUsage(key);
        const memoryFormatted = formatMemoryUsage(memoryBytes);

        let size: number | null = null;

        switch (type) {
          case "string":
            size = await client.strLen(key);
            break;
          case "list":
            size = await client.lLen(key);
            break;
          case "set":
            size = await client.sCard(key);
            break;
          case "hash":
            size = await client.hLen(key);
            break;
          case "zset":
            size = await client.zCard(key);
            break;
          default:
            size = null;
        }

        return { key, type, ttl, size, memoryFormatted };
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
