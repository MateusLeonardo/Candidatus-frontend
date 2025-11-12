import { useToastError, useToastSuccess } from "@/hooks/useToast";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { IRequestRegisterCity } from "@/types/city";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationRegisterCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (city: IRequestRegisterCity) => {
      const response = await api.post("/city", city);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Cidade registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
