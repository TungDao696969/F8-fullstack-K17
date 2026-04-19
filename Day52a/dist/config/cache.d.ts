export declare const CACHE_PREFIX = "app";
export declare const DEFAULT_CACHE_VERSION = 1;
export declare const CACHE_TTL: {
    readonly coin: {
        readonly list: 30;
        readonly detail: 60;
    };
};
export type CacheEntity = keyof typeof CACHE_TTL;
export type CacheScope<E extends CacheEntity> = keyof (typeof CACHE_TTL)[E];
//# sourceMappingURL=cache.d.ts.map