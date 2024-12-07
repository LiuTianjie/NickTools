import httpRequest from "../service/index";
import type { CodeData, LoginData, RegisterData } from "./types";

const login = (data: LoginData) => {
  return httpRequest.post("/user/login", data);
};

const getCode = (data: CodeData) => {
  return httpRequest.post("/user/getCode", data);
};

const register = (data: RegisterData) => {
  return httpRequest.post("/user/register", data);
};

export { login, getCode, register };
