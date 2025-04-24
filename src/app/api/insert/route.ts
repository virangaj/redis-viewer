import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client";
import { Logger } from "@/utils/logger";

const logger = Logger({ prefix: 'INSERT API' });
export async function POST(req: NextRequest) {
  try {
    const { key, value } = await req.json();
    const client = await getRedisClient();
    logger.info("Connected to Redis")
    await client.set(key, value);
    await client.quit();
    logger.info("Values inserted")
    return NextResponse.json(
      { client: client, message: "Values inserted", data: {key, value } },
      { status: 200 }
    );
  } catch (error) {
    logger.error(`Error ${error}`)
  }
}
