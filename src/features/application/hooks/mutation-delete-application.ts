import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/application/${id}`),
    onSuccess: () => {
      useToastSuccess("Aplicação removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

