import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { url, password } = await req.json();

  const cookieStore = cookies();
  (await cookieStore).set("redis_url", url);
  (await cookieStore).set("redis_password", password || "");

  return NextResponse.json({
    success: true,
    message: "Redis connection saved to cookies",
  });
}
