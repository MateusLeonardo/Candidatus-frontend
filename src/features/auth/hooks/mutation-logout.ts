"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetUser } from "@/slices/user-slice";

export function mutationLogout() {
  const router = useRouter();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      dispatch(resetUser());
      router.push("/login");
    },
  });
}

