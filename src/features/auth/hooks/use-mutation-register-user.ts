"use client";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  IRequestRegisterUser,
  IResponseError,
  IResponseRegisteredUser,
} from "../types/auth";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationRegisterUser() {
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
      showToastSuccess("Usuário registrado com sucesso!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
