// /app/lib/redis.ts
import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379", // Adjust if needed
});

redisClient.connect();
