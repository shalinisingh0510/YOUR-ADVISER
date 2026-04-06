import axios from "axios";

const api = axios.create({
  baseURL: "https://your-adviser.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ya_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
