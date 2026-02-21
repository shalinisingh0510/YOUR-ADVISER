import api from "./api.js";

export async function login(payload) {
  const { data } = await api.post("/api/auth/login", payload);
  if (data?.token) {
    localStorage.setItem("ya_token", data.token);
  }
  return data;
}

export async function signup(payload) {
  const { data } = await api.post("/api/auth/signup", payload);
  if (data?.token) {
    localStorage.setItem("ya_token", data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem("ya_token");
}
