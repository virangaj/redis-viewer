"use server";
import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client"; // Adjust the path as necessary
import { Logger } from "@/utils/logger";
const logger = await Logger({ prefix: "KEY_DELETE_API" });

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  try {
    const client = await getRedisClient();
    await client.del(key);
    await client.quit();
    logger.info(`Deleted key: ${key}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete key: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
