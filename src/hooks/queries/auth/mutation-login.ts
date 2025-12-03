"use client";
import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import { IRequestUserLogin, IResponseError } from "@/types/auth";
import { IResponseUserLoggedIn } from "@/types/auth";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function mutationLogin() {
  const router = useRouter();

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
      useToastSuccess("Login realizado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
