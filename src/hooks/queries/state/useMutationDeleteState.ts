"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/useToast";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationDeleteState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/state/${id}`);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Estado removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
