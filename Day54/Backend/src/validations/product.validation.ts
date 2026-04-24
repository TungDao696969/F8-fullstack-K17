import { z } from "zod";

export const productValidate = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});
