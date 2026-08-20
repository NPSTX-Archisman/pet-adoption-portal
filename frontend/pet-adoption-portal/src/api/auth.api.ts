import api from "./axios";

export const login = (
  email: string,
  password: string
) => {
  return api.post("/auth/login", {
    email,
    passwordHash: password,
  });
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const register = (
  fullName: string, 
  email: string, 
  password: string
) => {
  return api.post("/auth/register", {
    fullName,
    email,
    passwordHash: password
  })
};

export const getUser = () => {
  return api.get("/auth/me");
}