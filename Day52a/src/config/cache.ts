export const CACHE_PREFIX = "app";
export const DEFAULT_CACHE_VERSION = 1;

export const CACHE_TTL = {
  coin: {
    list: 30,
    detail: 60,
  },
} as const;

export type CacheEntity = keyof typeof CACHE_TTL;
export type CacheScope<E extends CacheEntity> = keyof (typeof CACHE_TTL)[E];
