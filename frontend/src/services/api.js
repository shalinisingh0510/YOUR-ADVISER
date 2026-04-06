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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🔒 Unauthorized access - Clearing session...");
      localStorage.removeItem("ya_token");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
