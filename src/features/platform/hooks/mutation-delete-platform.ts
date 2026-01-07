"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationDeletePlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/platform/${id}`),
    onSuccess: () => {
      useToastSuccess("Plataforma removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

