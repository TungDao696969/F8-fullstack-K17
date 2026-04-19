import { Request, Response } from "express";
import {
  getCoinDetail,
  getCoinList,
  handleCoinDeleted,
  handleCoinUpdated,
} from "../services/coin.service";

export const coinController = {
  async getList(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const data = await getCoinList(page);

      return res.json({
        message: "Coin list fetched successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async getDetail(req: Request, res: Response) {
    try {
      const symbol = req.params.symbol;

      if (typeof symbol !== "string" || !symbol) {
        return res.status(400).json({
          message: "Missing symbol",
        });
      }

      const data = await getCoinDetail(symbol);

      return res.json({
        message: "Coin detail fetched successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async refreshCacheAfterUpdate(req: Request, res: Response) {
    try {
      const symbol = req.params.symbol;

      if (typeof symbol !== "string" || !symbol) {
        return res.status(400).json({
          message: "Missing symbol",
        });
      }

      await handleCoinUpdated(symbol);

      return res.json({
        message: "Coin caches invalidated after update",
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async refreshCacheAfterDelete(req: Request, res: Response) {
    try {
      const symbol = req.params.symbol;

      if (typeof symbol !== "string" || !symbol) {
        return res.status(400).json({
          message: "Missing symbol",
        });
      }

      await handleCoinDeleted(symbol);

      return res.json({
        message: "Coin caches invalidated after delete",
      });
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
