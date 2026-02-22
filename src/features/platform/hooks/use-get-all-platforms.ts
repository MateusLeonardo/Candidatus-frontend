"use client";

import api from "@/lib/api";
import { IResponseAllPlatforms } from "../types/platform";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const response = await api.get("/platform");
      return response.data as IResponseAllPlatforms;
    },
    staleTime: 1000 * 60 * 60,
  });
}
