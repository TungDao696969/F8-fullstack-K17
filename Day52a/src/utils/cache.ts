import {
  CACHE_TTL,
  CacheEntity,
  CacheScope,
  DEFAULT_CACHE_VERSION,
} from "../config/cache";
import {
  buildCacheKey,
  buildCacheTagKey,
  buildCacheVersionKey,
} from "./cacheKey";
import { createRedisClient } from "./redis";

const redis = createRedisClient();

type CacheParams = Record<string, string | number | boolean | null | undefined>;

type RememberOptions<E extends CacheEntity, S extends CacheScope<E>> = {
  entity: E;
  scope: S;
  params?: CacheParams;
  tags?: string[];
};

const getTtl = <E extends CacheEntity, S extends CacheScope<E>>(
  entity: E,
  scope: S,
) => {
  return Number(CACHE_TTL[entity][scope]);
};

const trackTags = async (key: string, tags: string[]) => {
  if (tags.length === 0) {
    return;
  }

  await Promise.all(
    tags.map((tag) => redis.sadd(buildCacheTagKey(tag), key)),
  );
};

export const cache = {
  async get<T>(key: string) {
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  },

  async set(key: string, value: unknown, ttl: number, tags: string[] = []) {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
    await trackTags(key, tags);
  },

  async forget(key: string) {
    await redis.del(key);
  },

  async forgetMany(keys: string[]) {
    if (keys.length === 0) {
      return;
    }

    await redis.del(...keys);
  },

  async forgetByTag(tag: string) {
    const tagKey = buildCacheTagKey(tag);
    const keys = await redis.smembers(tagKey);

    if (keys.length > 0) {
      await redis.del(...keys);
    }

    await redis.del(tagKey);
  },

  async getScopeVersion<E extends CacheEntity, S extends CacheScope<E>>(
    entity: E,
    scope: S,
  ) {
    const versionKey = buildCacheVersionKey(entity, scope);
    const rawVersion = await redis.get(versionKey);

    if (!rawVersion) {
      await redis.set(versionKey, String(DEFAULT_CACHE_VERSION));
      return DEFAULT_CACHE_VERSION;
    }

    return Number(rawVersion);
  },

  async bumpScopeVersion<E extends CacheEntity, S extends CacheScope<E>>(
    entity: E,
    scope: S,
  ) {
    const versionKey = buildCacheVersionKey(entity, scope);
    return await redis.incr(versionKey);
  },

  async remember<T, E extends CacheEntity, S extends CacheScope<E>>(
    options: RememberOptions<E, S>,
    resolver: () => Promise<T>,
  ) {
    const version = await this.getScopeVersion(options.entity, options.scope);
    const key = buildCacheKey(
      options.entity,
      options.scope,
      options.params,
      version,
    );
    const cached = await this.get<T>(key);

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
