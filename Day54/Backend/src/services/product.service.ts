import { prisma } from "../utils/prisma";

export const ProductService = {
  create: (data: any) => prisma.product.create({ data }),

  findAll: () => prisma.product.findMany(),

  findOne: (id: number) => prisma.product.findUnique({ where: { id } }),

  update: (id: number, data: any) =>
    prisma.product.update({ where: { id }, data }),

  delete: (id: number) => prisma.product.delete({ where: { id } }),
};
