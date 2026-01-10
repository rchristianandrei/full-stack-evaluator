import api from "./axios";

const path = "/auth";

export function login(email, password) {
  return api.post(path + "/login", {
    email,
    password,
  });
}

export default { login };
