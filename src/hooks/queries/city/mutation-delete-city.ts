import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationDeleteCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/city/${id}`),
    onSuccess: () => {
      useToastSuccess("Cidade removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
