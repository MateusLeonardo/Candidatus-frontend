import { useToastError, useToastSuccess } from "@/hooks/useToast";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { IRequestUpdateCity } from "@/types/city";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdateCityPayload extends IRequestUpdateCity {
  id: number;
}

export function useMutationUpdateCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCityPayload) => {
      const response = await api.put(`/city/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Cidade atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
