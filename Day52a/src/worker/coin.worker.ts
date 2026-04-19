import "dotenv/config";
import { COIN_PRICES_CHANNEL, createRedisClient } from "../utils/redis";

const redis = createRedisClient();
const BINANCE_PRICE_API =
  'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT"]';

const fetchPrices = async () => {
  try {
    const response = await fetch(BINANCE_PRICE_API);

    if (!response.ok) {
      throw new Error(`Binance API responded with status ${response.status}`);
    }

    const data = await response.json();

    await redis.publish(COIN_PRICES_CHANNEL, JSON.stringify(data));
    console.log("Published coin prices:", data);
  } catch (error) {
    console.error("Worker error:", error);
  }
};

void fetchPrices();
setInterval(fetchPrices, 5000);
