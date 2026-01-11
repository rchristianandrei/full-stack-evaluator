import api from "./axios";

const path = "/auth";

export async function login(email, password) {
  const res = await api.post(path + "/login", {
    email,
    password,
  });
  return res.data;
}

export async function register(email, password) {
  const res = await api.post(path + "/register", {
    email,
    password,
  });
  return res.data;
}

export async function getMe() {
  const res = await api.get(path + "/me");
  return res.data;
}

export default { login, register, getMe };
