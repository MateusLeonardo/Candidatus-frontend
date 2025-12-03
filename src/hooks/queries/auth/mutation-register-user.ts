"use client";
import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import { IRequestRegisterUser, IResponseError } from "@/types/auth";
import { IResponseRegisteredUser } from "@/types/auth";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";

export function mutationRegisterUser() {
  const router = useRouter();

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
      router.push("/dashboard");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
