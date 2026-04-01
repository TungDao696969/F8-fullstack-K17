import { Product, ProductQuery } from "../types/product";
import { prisma } from "../utils/prisma";
import { ProductWhereInput } from "../generated/prisma/models";
import { Prisma } from "../generated/prisma/client";
export const productService = {
  createProduct: async (userId: number, data: Product) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      const err: any = new Error("User not found");
      err.status = 404;
      throw err;
    }

    return prisma.product.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  },

  findAll: async ({ userId, q, page = 1, limit = 10 }: ProductQuery) => {
    const pageNumber = Number(page) || 1;
    const limitNumber = Math.min(Number(limit) || 10, 50);

    const filters: ProductWhereInput = {};

    if (userId) {
      filters.userId = Number(userId);
    }

    if (q) {
      filters.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: filters,
        skip,
        take: limitNumber,
        orderBy: { id: "desc" },
      }),
      prisma.product.count({
        where: filters,
      }),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  },

  find: async (id: number) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      const error: any = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      createdBy: product.user,
    };
  },

  updateProduct: async (id: number, body: any) => {
    try {
      const updated = await prisma.product.update({
        where: { id },
        data: {
          ...body,
          updated_at: new Date(),
        },
      });

      return updated;
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        const err: any = new Error("Product not found");
        err.status = 404;
        throw err;
      }

      throw error;
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const productData = await prisma.product.delete({
        where: { id },
      });

      return productData;
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        const err: any = new Error("Product not found");
        err.status = 404;
        throw err;
      }

      throw error;
    }
  },
};
