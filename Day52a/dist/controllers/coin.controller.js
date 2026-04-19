"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinController = void 0;
const coin_service_1 = require("../services/coin.service");
exports.coinController = {
    async getList(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const data = await (0, coin_service_1.getCoinList)(page);
            return res.json({
                message: "Coin list fetched successfully",
                data,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    async getDetail(req, res) {
        try {
            const symbol = req.params.symbol;
            if (typeof symbol !== "string" || !symbol) {
                return res.status(400).json({
                    message: "Missing symbol",
                });
            }
            const data = await (0, coin_service_1.getCoinDetail)(symbol);
            return res.json({
                message: "Coin detail fetched successfully",
                data,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    async refreshCacheAfterUpdate(req, res) {
        try {
            const symbol = req.params.symbol;
            if (typeof symbol !== "string" || !symbol) {
                return res.status(400).json({
                    message: "Missing symbol",
                });
            }
            await (0, coin_service_1.handleCoinUpdated)(symbol);
            return res.json({
                message: "Coin caches invalidated after update",
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    async refreshCacheAfterDelete(req, res) {
        try {
            const symbol = req.params.symbol;
            if (typeof symbol !== "string" || !symbol) {
                return res.status(400).json({
                    message: "Missing symbol",
                });
            }
            await (0, coin_service_1.handleCoinDeleted)(symbol);
            return res.json({
                message: "Coin caches invalidated after delete",
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
//# sourceMappingURL=coin.controller.js.map