import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await api.get("/user");
      return response.data;
    },
  });
}

