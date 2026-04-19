"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisClient = exports.COIN_PRICES_CHANNEL = exports.REDIS_URL = void 0;
require("dotenv/config");
const ioredis_1 = __importDefault(require("ioredis"));
exports.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6380";
exports.COIN_PRICES_CHANNEL = "coin-prices";
const createRedisClient = () => {
    const client = new ioredis_1.default(exports.REDIS_URL);
    client.on("error", (error) => {
        console.error("Redis error:", error);
    });
    return client;
};
exports.createRedisClient = createRedisClient;
//# sourceMappingURL=redis.js.map