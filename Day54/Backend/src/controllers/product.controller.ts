import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const ProductController = {
  create: async (req: Request, res: Response) => {
    const product = await ProductService.create(req.body);
    res.json(product);
  },

  findAll: async (_: Request, res: Response) => {
    const products = await ProductService.findAll();
    res.json(products);
  },

  findOne: async (req: Request, res: Response) => {
    const product = await ProductService.findOne(Number(req.params.id));
    res.json(product);
  },

  update: async (req: Request, res: Response) => {
    const product = await ProductService.update(
      Number(req.params.id),
      req.body,
    );
    res.json(product);
  },

  delete: async (req: Request, res: Response) => {
    await ProductService.delete(Number(req.params.id));
    res.json({ message: "Deleted" });
  },
};
