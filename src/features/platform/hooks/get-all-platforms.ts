"use client";

import api from "@/lib/api";
import { IResponseAllPlatforms } from "../types/platform";
import { useQuery } from "@tanstack/react-query";

export function getAllPlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      const response = await api.get("/platform");
      return response.data as IResponseAllPlatforms;
    },
  });
}

