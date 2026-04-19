import { cache } from "../utils/cache";
import { buildCacheKey } from "../utils/cacheKey";

const BINANCE_TICKER_PRICE_API = "https://api.binance.com/api/v3/ticker/price";

type CoinPrice = {
  symbol: string;
  price: string;
};

const buildCoinDetailTag = (symbol: string) => {
  return `coin:detail:${symbol.toUpperCase()}`;
};

const fetchCoinListFromApi = async () => {
  const response = await fetch(BINANCE_TICKER_PRICE_API);

  if (!response.ok) {
    throw new Error(`Binance API responded with status ${response.status}`);
  }

  return (await response.json()) as CoinPrice[];
};

const fetchCoinDetailFromApi = async (symbol: string) => {
  const response = await fetch(
    `${BINANCE_TICKER_PRICE_API}?symbol=${symbol.toUpperCase()}`,
  );

  if (!response.ok) {
    throw new Error(`Binance API responded with status ${response.status}`);
  }

  return (await response.json()) as CoinPrice;
};

export const getCoinList = async (page: number) => {
  const result = await cache.remember(
    {
      entity: "coin",
      scope: "list",
      params: { page },
      tags: ["coin:list"],
    },
    async () => {
      return await fetchCoinListFromApi();
    },
  );

  console.log(`Coin list cache ${result.hit ? "HIT" : "MISS"}:`, result.key);
  return result.data;
};

export const getCoinDetail = async (symbol: string) => {
  const normalizedSymbol = symbol.toUpperCase();
  const result = await cache.remember(
    {
      entity: "coin",
      scope: "detail",
      params: { symbol: normalizedSymbol },
      tags: [buildCoinDetailTag(normalizedSymbol)],
    },
    async () => {
      return await fetchCoinDetailFromApi(normalizedSymbol);
    },
  );

  console.log(`Coin detail cache ${result.hit ? "HIT" : "MISS"}:`, result.key);
  return result.data;
};

export const invalidateCoinListCache = async () => {
  await cache.bumpScopeVersion("coin", "list");
};

export const forgetCoinDetailCache = async (symbol: string) => {
  await cache.forgetByTag(buildCoinDetailTag(symbol.toUpperCase()));
};

export const handleCoinUpdated = async (symbol: string) => {
  await forgetCoinDetailCache(symbol);
  await invalidateCoinListCache();
};

export const handleCoinDeleted = async (symbol: string) => {
  const version = await cache.getScopeVersion("coin", "detail");
  const detailKey = buildCacheKey(
    "coin",
    "detail",
    { symbol: symbol.toUpperCase() },
    version,
  );

  await cache.forget(detailKey);
  await forgetCoinDetailCache(symbol);
  await invalidateCoinListCache();
};
