import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProduct = () => BASE_URL.get("/products");
export const getProductDetail = (id) => BASE_URL.get(`/products/${id}`);
export const getPagination = (skip, limit) =>
  BASE_URL.get(`/products?skip=${skip}&limit=${limit}`);

export const getSearch = (keyword) => {
  return BASE_URL.get("/products/search", {
    params: { q: keyword },
  });
};
