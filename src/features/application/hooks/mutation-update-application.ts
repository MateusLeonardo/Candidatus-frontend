import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { IRequestUpdateApplication } from "../types/application";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: IRequestUpdateApplication) =>
      api.put(`/application/${id}`, data),
    onSuccess: () => {
      useToastSuccess("Aplicação atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

