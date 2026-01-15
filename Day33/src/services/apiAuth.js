import axios from "axios";
const BASE_URL = "https://api.escuelajs.co/api/v1";
const httpRequest = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});
export default httpRequest;

export const loginApi = (data) => {
    return httpRequest.post("/auth/login", data);
}
export const profileApi = () => {
    return httpRequest.get("/auth/profile")
}