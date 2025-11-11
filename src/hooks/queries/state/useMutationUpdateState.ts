"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/useToast";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterStateFormData } from "@/lib/validations/state";

interface UpdateStatePayload extends RegisterStateFormData {
  id: number;
}

export function useMutationUpdateState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateStatePayload) => {
      const response = await api.put(`/state/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Estado atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
