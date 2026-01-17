"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "@/slices/user-slice";

export function UserLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}
