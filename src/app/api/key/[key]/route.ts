import { NextResponse } from "next/server";
import { redisClient } from "../../../lib/redis";

export async function GET(
  req: Request,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  try {
    const type = await redisClient.type(key);
    let value;

    if (type === "string") {
      value = await redisClient.get(key);
    } else if (type === "list") {
      value = await redisClient.lRange(key, 0, -1);
    } else if (type === "hash") {
      value = await redisClient.hGetAll(key);
    } else if (type === "set") {
      value = await redisClient.sMembers(key);
    } else if (type === "zset") {
    //   value = await redisClient.zRange(key, 0, -1, { WITHSCORES: true });
    } else {
      value = "Unsupported type or empty";
    }

    return NextResponse.json({ key, type, value });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch keys ${error}` },
      { status: 500 }
    );
  }
}
