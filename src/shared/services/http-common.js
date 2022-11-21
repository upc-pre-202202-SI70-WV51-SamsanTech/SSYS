import axios from "axios";

const instance = axios.create({
  baseURL: "http://www.ssys-enterprise.somee.com/api/v1",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (
      !config.url?.includes("users/auth/sign-in") &&
      !config.url?.includes("users/auth/sign-up") &&
      config.headers
    )
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
