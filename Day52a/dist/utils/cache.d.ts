import { CacheEntity, CacheScope } from "../config/cache";
type CacheParams = Record<string, string | number | boolean | null | undefined>;
type RememberOptions<E extends CacheEntity, S extends CacheScope<E>> = {
    entity: E;
    scope: S;
    params?: CacheParams;
    tags?: string[];
};
export declare const cache: {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: unknown, ttl: number, tags?: string[]): Promise<void>;
    forget(key: string): Promise<void>;
    forgetMany(keys: string[]): Promise<void>;
    forgetByTag(tag: string): Promise<void>;
    getScopeVersion<E extends CacheEntity, S extends CacheScope<E>>(entity: E, scope: S): Promise<number>;
    bumpScopeVersion<E extends CacheEntity, S extends CacheScope<E>>(entity: E, scope: S): Promise<number>;
    remember<T, E extends CacheEntity, S extends CacheScope<E>>(options: RememberOptions<E, S>, resolver: () => Promise<T>): Promise<{
        data: Awaited<T>;
        key: string;
        hit: boolean;
    }>;
};
export {};
//# sourceMappingURL=cache.d.ts.map