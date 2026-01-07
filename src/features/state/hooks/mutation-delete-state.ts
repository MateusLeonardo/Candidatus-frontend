"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationDeleteState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => api.delete(`/state/${id}`),
    onSuccess: () => {
      useToastSuccess("Estado removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

