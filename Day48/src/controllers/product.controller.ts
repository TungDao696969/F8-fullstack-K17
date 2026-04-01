import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import { ProductQuery } from "../types/product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, ...data } = req.body;
    const product = await productService.createProduct(userId, data);

    return res.status(201).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (
  req: Request<object, object, object, ProductQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productService.findAll(req.query);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      const error: any = new Error("Invalid product id");
      error.status = 400;
      throw error;
    }

    const product = await productService.find(id);

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      const error: any = new Error("Invalid product id");
      error.status = 400;
      throw error;
    }

    const product = await productService.updateProduct(id, req.body);

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePoduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      const error: any = new Error("Invalid product id");
      error.status = 400;
      throw error;
    }

    await productService.deleteProduct(id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
