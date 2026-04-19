"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCacheTagKey = exports.buildCacheVersionKey = exports.buildCacheKey = void 0;
const cache_1 = require("../config/cache");
const normalizeParams = (params = {}) => {
    const entries = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .sort(([left], [right]) => left.localeCompare(right));
    if (entries.length === 0) {
        return "all";
    }
    return entries.map(([key, value]) => `${key}=${String(value)}`).join("&");
};
const buildCacheKey = (entity, scope, params = {}, version = cache_1.DEFAULT_CACHE_VERSION) => {
    return `${cache_1.CACHE_PREFIX}:v${version}:${entity}:${String(scope)}:${normalizeParams(params)}`;
};
exports.buildCacheKey = buildCacheKey;
const buildCacheVersionKey = (entity, scope) => {
    return `${cache_1.CACHE_PREFIX}:meta:version:${entity}:${String(scope)}`;
};
exports.buildCacheVersionKey = buildCacheVersionKey;
const buildCacheTagKey = (tag) => {
    return `${cache_1.CACHE_PREFIX}:tag:${tag}`;
};
exports.buildCacheTagKey = buildCacheTagKey;
//# sourceMappingURL=cacheKey.js.map