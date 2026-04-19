"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const cache_1 = require("../config/cache");
const cacheKey_1 = require("./cacheKey");
const redis_1 = require("./redis");
const redis = (0, redis_1.createRedisClient)();
const getTtl = (entity, scope) => {
    return Number(cache_1.CACHE_TTL[entity][scope]);
};
const trackTags = async (key, tags) => {
    if (tags.length === 0) {
        return;
    }
    await Promise.all(tags.map((tag) => redis.sadd((0, cacheKey_1.buildCacheTagKey)(tag), key)));
};
exports.cache = {
    async get(key) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    },
    async set(key, value, ttl, tags = []) {
        await redis.set(key, JSON.stringify(value), "EX", ttl);
        await trackTags(key, tags);
    },
    async forget(key) {
        await redis.del(key);
    },
    async forgetMany(keys) {
        if (keys.length === 0) {
            return;
        }
        await redis.del(...keys);
    },
    async forgetByTag(tag) {
        const tagKey = (0, cacheKey_1.buildCacheTagKey)(tag);
        const keys = await redis.smembers(tagKey);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
        await redis.del(tagKey);
    },
    async getScopeVersion(entity, scope) {
        const versionKey = (0, cacheKey_1.buildCacheVersionKey)(entity, scope);
        const rawVersion = await redis.get(versionKey);
        if (!rawVersion) {
            await redis.set(versionKey, String(cache_1.DEFAULT_CACHE_VERSION));
            return cache_1.DEFAULT_CACHE_VERSION;
        }
        return Number(rawVersion);
    },
    async bumpScopeVersion(entity, scope) {
        const versionKey = (0, cacheKey_1.buildCacheVersionKey)(entity, scope);
        return await redis.incr(versionKey);
    },
    async remember(options, resolver) {
        const version = await this.getScopeVersion(options.entity, options.scope);
        const key = (0, cacheKey_1.buildCacheKey)(options.entity, options.scope, options.params, version);
        const cached = await this.get(key);
        if (cached !== null) {
            return {
                data: cached,
                key,
                hit: true,
            };
        }
        const data = await resolver();
        await this.set(key, data, getTtl(options.entity, options.scope), options.tags);
        return {
            data,
            key,
            hit: false,
        };
    },
};
//# sourceMappingURL=cache.js.map