import { CACHE_TAGS } from "@/constants/cache.constant";

export type Product = {
  id: number;
  name: string;
};

export const productServices = {
  getProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "force-cache",
      // cache: "no-store",
      next: {
        tags: [CACHE_TAGS.PRODUCTS],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  },

  getProductById: async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        cache: "force-cache",
        next: {
          tags: [CACHE_TAGS.PRODUCT_DETAIL(id)],
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  },
};
