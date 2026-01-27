import { IResponseError } from "@/features/auth/types/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function showToastError(error: AxiosError<IResponseError>) {
  switch (error.response?.status) {
    case 400:
      error.response?.data.errors?.forEach((error: string) => {
        toast.error(error);
      });
      break;
    case 401:
      toast.error(error.response?.data.errors?.[0]);
      break;
    case 404:
      toast.error(error.response?.data.errors?.[0]);
      break;
    case 500:
      toast.error(error.response?.data.errors?.[0]);
      break;
    default:
      toast.error("Ocorreu um erro ao processar a requisição");
      break;
  }
}

export function showToastSuccess(message: string) {
  toast.success(message);
}
