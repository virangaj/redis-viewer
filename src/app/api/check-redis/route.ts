import { checkRedis } from "@/lib/redis-client";
import { NextResponse } from "next/server";

export async function GET() {
  const ports = [6379, 6380, 6381];
  const results = await Promise.all(ports.map(checkRedis));
  const finalResult = results.filter((v) => v.running === true);
  return NextResponse.json(finalResult);
}
