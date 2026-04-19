import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export const productController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.createProduct(req.body);

      res.status(201).json({
        success: true,
        message: "Create product success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProducts();

      res.json({
        success: true,
        message: "Get products success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  find: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.getProductById(id);

      res.json({
        success: true,
        message: "Get product success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.updateProduct(id, req.body);

      res.json({
        success: true,
        message: "Update product success",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await productService.deleteProduct(id);

      res.json({
        success: true,
        message: "Delete product success",
      });
    } catch (error) {
      next(error);
    }
  },
};
