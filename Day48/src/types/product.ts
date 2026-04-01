export interface Product {
  name: string;
  desc?: string;
  price: number;
  stock?: number;
  userId: number;
}

export type ProductQuery = {
  userId?: string;
  q?: string;
  page?: number;
  limit?: number;
};
