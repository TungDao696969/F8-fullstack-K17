"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const redis_1 = require("../utils/redis");
const redis = (0, redis_1.createRedisClient)();
const BINANCE_PRICE_API = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT"]';
const fetchPrices = async () => {
    try {
        const response = await fetch(BINANCE_PRICE_API);
        if (!response.ok) {
            throw new Error(`Binance API responded with status ${response.status}`);
        }
        const data = await response.json();
        await redis.publish(redis_1.COIN_PRICES_CHANNEL, JSON.stringify(data));
        console.log("Published coin prices:", data);
    }
    catch (error) {
        console.error("Worker error:", error);
    }
};
void fetchPrices();
setInterval(fetchPrices, 5000);
//# sourceMappingURL=coin.worker.js.map