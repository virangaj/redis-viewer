"use server";
import { Logger } from "@/utils/logger";
import { cookies } from "next/headers";
import { createClient } from "redis";

const logger = await Logger({ prefix: "REDIS_CLIENT" })

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

export async function checkRedis(port: number) {
  const client = createClient({
    socket: { port, host: "127.0.0.1", connectTimeout: 500 },
  });

  try {
    await client.connect();
    await client.ping();
    await client.disconnect();
    return { port, running: true };
  } catch (err) {
    logger.error(`Error: ${err}`)
    if (client.isOpen) await client.disconnect();
    return { port, running: false };
  }
}