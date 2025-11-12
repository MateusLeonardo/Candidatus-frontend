import { useToastError, useToastSuccess } from "@/hooks/useToast";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationDeleteCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/city/${id}`);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Cidade removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
