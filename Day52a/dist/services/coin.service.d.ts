type CoinPrice = {
    symbol: string;
    price: string;
};
export declare const getCoinList: (page: number) => Promise<CoinPrice[]>;
export declare const getCoinDetail: (symbol: string) => Promise<CoinPrice>;
export declare const invalidateCoinListCache: () => Promise<void>;
export declare const forgetCoinDetailCache: (symbol: string) => Promise<void>;
export declare const handleCoinUpdated: (symbol: string) => Promise<void>;
export declare const handleCoinDeleted: (symbol: string) => Promise<void>;
export {};
//# sourceMappingURL=coin.service.d.ts.map