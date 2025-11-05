// import { useRefreshToken } from "@/hooks/queries/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const useRefreshTokenMutation = useRefreshToken();
    if (error.response?.status === 401) {
      // if (error.response?.data.tokenIsExpired) {
      //   const refreshToken = Cookies.get("refresh_token");
      //   if (refreshToken) {
      //     useRefreshTokenMutation.mutate({ refreshToken });
      //   }
      // }
      const token = Cookies.get("access_token");

      if (token) {
        Cookies.remove("access_token");
      }
    }
    if (error.response?.status === 500) {
      console.error(error.response.data);
    }
    return Promise.reject(error);
  }
);
