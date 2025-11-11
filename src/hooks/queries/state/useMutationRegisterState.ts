"use client";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToastSuccess } from "@/hooks/useToast";
import { useToastError } from "@/hooks/useToast";
import { RegisterStateFormData } from "@/lib/validations/state";

export function useMutationRegisterState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterStateFormData) => {
      const response = await api.post("/state", data);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Estado registrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
