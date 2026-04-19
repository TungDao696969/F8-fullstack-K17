import {
  CACHE_PREFIX,
  CacheEntity,
  CacheScope,
  DEFAULT_CACHE_VERSION,
} from "../config/cache";

type CacheParams = Record<string, string | number | boolean | null | undefined>;

const normalizeParams = (params: CacheParams = {}) => {
  const entries = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .sort(([left], [right]) => left.localeCompare(right));

  if (entries.length === 0) {
    return "all";
  }

  return entries.map(([key, value]) => `${key}=${String(value)}`).join("&");
};

export const buildCacheKey = <E extends CacheEntity, S extends CacheScope<E>>(
  entity: E,
  scope: S,
  params: CacheParams = {},
  version = DEFAULT_CACHE_VERSION,
) => {
  return `${CACHE_PREFIX}:v${version}:${entity}:${String(scope)}:${normalizeParams(params)}`;
};

export const buildCacheVersionKey = <
  E extends CacheEntity,
  S extends CacheScope<E>,
>(
  entity: E,
  scope: S,
) => {
  return `${CACHE_PREFIX}:meta:version:${entity}:${String(scope)}`;
};

export const buildCacheTagKey = (tag: string) => {
  return `${CACHE_PREFIX}:tag:${tag}`;
};
