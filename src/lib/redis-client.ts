"use server";
import { cookies } from "next/headers";
import { createClient } from "redis";

export async function getRedisClient() {
  const cookieStore = cookies();
  const url = (await cookieStore).get("redis_url")?.value;
  const password = (await cookieStore).get("redis_password")?.value;

  if (!url) throw new Error("Redis URL not found in cookies");

  const client = createClient({
    url,
    password: password || undefined,
  });

  client.on("error", (err) => console.error("Redis Error:", err));
  await client.connect();

  return client;
}
