import "dotenv/config";
import IORedis from "ioredis";

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6380";
export const COIN_PRICES_CHANNEL = "coin-prices";

export const createRedisClient = () => {
  const client = new IORedis(REDIS_URL);

  client.on("error", (error) => {
    console.error("Redis error:", error);
  });

  return client;
};
