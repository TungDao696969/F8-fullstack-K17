import { create } from "zustand";
import { loginApi, profileApi } from "../services/apiAuth";

export const useAuth = create((set) => ({
  token: localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await loginApi({ email, password });

      localStorage.setItem("token", res.data.access_token);

      set({
        token: res.data.access_token,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message,
        loading: false,
      });
    }
  },

  getProfile: async () => {
    try {
      const res = await profileApi();
      set({ user: res.data });
    } catch (error) {
      console.log("Get profile fail", err);
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
