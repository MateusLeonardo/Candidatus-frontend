"use client";
import Link from "next/link";
import {
  Clipboard,
  Map,
  MapPin,
  User,
  LogOut,
  Settings,
  MoreVerticalIcon,
  Building,
  Briefcase,
  LaptopMinimal,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mutationLogout } from "@/features/auth/hooks/mutation-logout";
import { useUserContext } from "@/providers/user-context";

export default function SidenavDashboard() {
  const { mutate: logout } = mutationLogout();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { user } = useUserContext();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Clipboard,
    },
    {
      href: "/dashboard/estados",
      label: "Estados",
      icon: Map,
    },
    {
      href: "/dashboard/cidades",
      label: "Cidades",
      icon: MapPin,
    },
    {
      href: "/dashboard/empresas",
      label: "Empresas",
      icon: Building,
    },
    {
      href: "/dashboard/plataformas",
      label: "Plataformas",
      icon: LaptopMinimal,
    },
    {
      href: "/dashboard/aplicacoes",
      label: "Aplicações",
      icon: Briefcase,
    },
  ];

  return (
    <aside className="w-72 h-full min-h-screen flex flex-col bg-background text-slate-700 dark:text-slate-200">
      <div className="flex flex-col border-b h-[65px]">
        <h1 className="text-xl font-bold tracking-tight py-4 px-3 h-full flex items-center">
          Candidatus
        </h1>
      </div>

      <nav className="flex-1 flex flex-col mt-4">
        <ul className="space-y-2 flex-1 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 py-2.5 px-3 rounded-lg font-medium transition-colors duration-200 ${
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon
                    className={`size-5 transition-colors ${
                      active
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-accent-foreground"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
