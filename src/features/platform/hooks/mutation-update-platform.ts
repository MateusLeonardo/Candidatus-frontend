"use client";

import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { RegisterPlatformFormData } from "@/lib/validations/platform";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdatePlatformPayload extends RegisterPlatformFormData {
  id: number;
}

export function mutationUpdatePlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdatePlatformPayload) =>
      api.put(`/platform/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      useToastSuccess("Plataforma atualizada com sucesso");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

