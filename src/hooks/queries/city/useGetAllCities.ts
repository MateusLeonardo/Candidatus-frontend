import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IResponseAllCities } from "@/types/city";

export function useGetAllCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await api.get("/city");
      return response.data as IResponseAllCities;
    },
  });
}
