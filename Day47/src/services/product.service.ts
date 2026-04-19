import { prisma } from "../utils/prisma";
import type {
  ProductCreateInput,
  ProductUpdateInput,
} from "../generated/prisma/models/Product";

export const createProduct = (data: ProductCreateInput) => {
  return prisma.product.create({ data });
};

export const getAllProducts = () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const updateProduct = async (
  id: number,
  data: ProductUpdateInput,
) => {
  // kiểm tra tồn tại trước
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    const error: any = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.product.delete({
    where: { id },
  });
};
