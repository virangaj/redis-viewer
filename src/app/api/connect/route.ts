"use server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Logger } from "@/utils/logger";

const logger = await Logger({ prefix: "CONNECT_API" });


export async function POST(req: NextRequest) {
  const { url, password } = await req.json();

  const cookieStore = cookies();
  (await cookieStore).set("redis_url", url);
  (await cookieStore).set("redis_password", password || "");
  logger.info("Redis connection saved to cookies");
  return NextResponse.json({
    success: true,
    message: "Redis connection saved to cookies",
  });
}
