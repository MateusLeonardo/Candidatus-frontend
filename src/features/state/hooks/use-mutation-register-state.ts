"use client";
import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterStateFormData } from "@/lib/validations/state";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationRegisterState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterStateFormData) => {
      const response = await api.post("/state", data);
      return response.data;
    },
    onSuccess: () => {
      showToastSuccess("Estado registrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
