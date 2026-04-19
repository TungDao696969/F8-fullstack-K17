import { CacheEntity, CacheScope } from "../config/cache";
type CacheParams = Record<string, string | number | boolean | null | undefined>;
export declare const buildCacheKey: <E extends CacheEntity, S extends CacheScope<E>>(entity: E, scope: S, params?: CacheParams, version?: number) => string;
export declare const buildCacheVersionKey: <E extends CacheEntity, S extends CacheScope<E>>(entity: E, scope: S) => string;
export declare const buildCacheTagKey: (tag: string) => string;
export {};
//# sourceMappingURL=cacheKey.d.ts.map