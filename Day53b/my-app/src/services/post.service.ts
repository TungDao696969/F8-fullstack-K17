import axios from "axios";
import { api } from "@/lib/axios";
import type { Post } from "@/types/post";

export const postService = {
  getAll: async () => {
    const res = await api.get("/posts");
    return res.data;
  },

  getById: async (id: string | number) => {
    const saved = localStorage.getItem("posts");

    if (saved) {
      const posts = JSON.parse(saved) as Post[];
      const found = posts.find((p) => p.id == id);

      if (found) return found;
    }

    const res = await api.get(`/posts/${id}`);
    return res.data;
  },

  create: async (data: { title: string; body: string; userId: number }) => {
    const res = await api.post("/posts/add", data);
    return res.data;
  },

  update: async (
    id: number,
    data: { title: string; body: string; userId: number },
  ) => {
    try {
      const res = await api.put(`/posts/${id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          id,
          ...data,
        };
      }

      throw error;
    }
  },
};
