"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCoinDeleted = exports.handleCoinUpdated = exports.forgetCoinDetailCache = exports.invalidateCoinListCache = exports.getCoinDetail = exports.getCoinList = void 0;
const cache_1 = require("../utils/cache");
const cacheKey_1 = require("../utils/cacheKey");
const BINANCE_TICKER_PRICE_API = "https://api.binance.com/api/v3/ticker/price";
const buildCoinDetailTag = (symbol) => {
    return `coin:detail:${symbol.toUpperCase()}`;
};
const fetchCoinListFromApi = async () => {
    const response = await fetch(BINANCE_TICKER_PRICE_API);
    if (!response.ok) {
        throw new Error(`Binance API responded with status ${response.status}`);
    }
    return (await response.json());
};
const fetchCoinDetailFromApi = async (symbol) => {
    const response = await fetch(`${BINANCE_TICKER_PRICE_API}?symbol=${symbol.toUpperCase()}`);
    if (!response.ok) {
        throw new Error(`Binance API responded with status ${response.status}`);
    }
    return (await response.json());
};
const getCoinList = async (page) => {
    const result = await cache_1.cache.remember({
        entity: "coin",
        scope: "list",
        params: { page },
        tags: ["coin:list"],
    }, async () => {
        return await fetchCoinListFromApi();
    });
    console.log(`Coin list cache ${result.hit ? "HIT" : "MISS"}:`, result.key);
    return result.data;
};
exports.getCoinList = getCoinList;
const getCoinDetail = async (symbol) => {
    const normalizedSymbol = symbol.toUpperCase();
    const result = await cache_1.cache.remember({
        entity: "coin",
        scope: "detail",
        params: { symbol: normalizedSymbol },
        tags: [buildCoinDetailTag(normalizedSymbol)],
    }, async () => {
        return await fetchCoinDetailFromApi(normalizedSymbol);
    });
    console.log(`Coin detail cache ${result.hit ? "HIT" : "MISS"}:`, result.key);
    return result.data;
};
exports.getCoinDetail = getCoinDetail;
const invalidateCoinListCache = async () => {
    await cache_1.cache.bumpScopeVersion("coin", "list");
};
exports.invalidateCoinListCache = invalidateCoinListCache;
const forgetCoinDetailCache = async (symbol) => {
    await cache_1.cache.forgetByTag(buildCoinDetailTag(symbol.toUpperCase()));
};
exports.forgetCoinDetailCache = forgetCoinDetailCache;
const handleCoinUpdated = async (symbol) => {
    await (0, exports.forgetCoinDetailCache)(symbol);
    await (0, exports.invalidateCoinListCache)();
};
exports.handleCoinUpdated = handleCoinUpdated;
const handleCoinDeleted = async (symbol) => {
    const version = await cache_1.cache.getScopeVersion("coin", "detail");
    const detailKey = (0, cacheKey_1.buildCacheKey)("coin", "detail", { symbol: symbol.toUpperCase() }, version);
    await cache_1.cache.forget(detailKey);
    await (0, exports.forgetCoinDetailCache)(symbol);
    await (0, exports.invalidateCoinListCache)();
};
exports.handleCoinDeleted = handleCoinDeleted;
//# sourceMappingURL=coin.service.js.map