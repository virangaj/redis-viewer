"use server";
import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client";
import { Logger } from "@/utils/logger";

const logger = await Logger({ prefix: "INSERT_API" });

export async function POST(req: NextRequest) {
  let client;
  try {
    const { key, value } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    client = await getRedisClient();
    logger.info(`Connected to Redis`);

    let insertedType = "";

    if (typeof value === "string" || typeof value === "number") {
      await client.set(key, String(value));
      insertedType = "string";
    } else if (Array.isArray(value)) {
      if (value.every((v) => typeof v === "string")) {
        await client.rPush(key, [...value]); // for arrays of strings
        insertedType = "list";
      } else {
        throw new Error(
          "All items in the array must be strings for Redis list."
        );
      }
    } else if (typeof value === "object" && value !== null) {
      if (Object.values(value).every((v) => typeof v === "string")) {
        await client.hSet(key, value);
        insertedType = "hash";
      } else {
        throw new Error(
          "All values in the object must be strings for Redis hash."
        );
      }
    } else {
      throw new Error("Unsupported value type");
    }

    logger.info(`Inserted key: ${key} as type: ${insertedType}`);

    await client.quit();

    return NextResponse.json({
      message: "Value inserted successfully",
      key,
      type: insertedType,
      value,
    });
  } catch (error) {
    logger.error(`Redis insert error: ${error}`);
    if (client) {
      await client.quit();
    }
    return NextResponse.json(
      { error: `Failed to insert key: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
