import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { IRequestUpdateCity } from "@/types/city";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdateCityPayload extends IRequestUpdateCity {
  id: number;
}

export function mutationUpdateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateCityPayload) =>
      api.put(`/city/${id}`, data),
    onSuccess: () => {
      useToastSuccess("Cidade atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
