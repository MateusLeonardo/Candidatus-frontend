"use client";

import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { RegisterPlatformFormData } from "@/lib/validations/platform";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationRegisterPlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterPlatformFormData) =>
      api.post("/platform", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      useToastSuccess("Plataforma registrada com sucesso");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
