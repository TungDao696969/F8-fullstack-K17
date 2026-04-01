import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  desc: z.string().optional(),
  price: z.number().gt(0, "Price must be greater than 0"),
  stock: z.number().min(0).optional().default(0),
  userId: z.number(),
});

export const updateProductSchema = z
  .object({
    name: z.string().min(2).optional(),
    desc: z.string().optional(),
    price: z.number().gt(0).optional(),
    stock: z.number().min(0).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Body must not be empty",
  });
