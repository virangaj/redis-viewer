import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis-client"; // Adjust the path as necessary

export async function DELETE(
  req: Request,
  { params }: { params: { key: string } }
) {
  const { key } = params;

  try {
    const client = await getRedisClient();
    await client.del(key);
    await client.quit();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete key: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
