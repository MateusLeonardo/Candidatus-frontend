"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { RootState } from "@/store/configure-store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { email } = useSelector((state: RootState) => state.user);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ModeToggle />
      <h1 className="text-2xl font-bold">Dashboard {email}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
