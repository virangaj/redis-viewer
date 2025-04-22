import { NextResponse } from "next/server";
import { redisClient } from "../../../../lib/redis";

export async function DELETE(
  req: Request,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  try {
    await redisClient.del(key);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete key ${error}` },
      { status: 500 }
    );
  }
}
