"use client";

import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToastError, useToastSuccess } from "../useToast";
import type {
  IResponseError,
  IResponseUserLoggedIn,
  IRequestUserLogin,
  IResponseRegisteredUser,
  IRequestRegisterUser,
} from "@/types/auth";
import { useUserStore } from "@/stores/user-store";

export function useLogin() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<
    IResponseUserLoggedIn,
    AxiosError<IResponseError>,
    IRequestUserLogin
  >({
    mutationFn: async (data: IRequestUserLogin) => {
      const response = await api.post<IResponseUserLoggedIn>("/login", data);
      return response.data;
    },
    onSuccess: async (data: IResponseUserLoggedIn) => {
      Cookies.set("access_token", data.tokens.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      setUser(data.user);
      useToastSuccess("Login realizado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

export function useRegisterUser() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation<
    IResponseRegisteredUser,
    AxiosError<IResponseError>,
    IRequestRegisterUser
  >({
    mutationFn: async (data: IRequestRegisterUser) => {
      const response = await api.post<IResponseRegisteredUser>("/user", data);
      return response.data;
    },
    onSuccess: (data: IResponseRegisteredUser) => {
      Cookies.set("access_token", data.tokens.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      useToastSuccess("Usuário registrado com sucesso!");
      setUser(data.user);
      router.push("/dashboard");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

// export function useRefreshToken() {
//   const router = useRouter();

//   return useMutation<
//     IResponseToken,
//     AxiosError<IResponseError>,
//     IRequestRefreshToken
//   >({
//     mutationFn: async (data: IRequestRefreshToken) => {
//       const response = await api.post<IResponseToken>("/refresh-token", data);
//       return response.data;
//     },
//     onSuccess: (data: IResponseToken) => {
//       Cookies.set("access_token", data.accessToken, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//       });
//       Cookies.set("refresh_token", data.refreshToken, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//       });
//     },
//     onError: (error: AxiosError<IResponseError>) => {
//       Cookies.remove("access_token");
//       Cookies.remove("refresh_token");
//       useToastError(error);
//       router.push("/login");
//     },
//   });
// }

export function useLogout() {
  const router = useRouter();
  const { logout } = useUserStore();
  return useMutation({
    mutationFn: async () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      logout();
      router.push("/login");
    },
  });
}
