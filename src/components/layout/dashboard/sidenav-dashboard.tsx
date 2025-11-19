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
import { useMutationLogout } from "@/hooks/queries/auth/useMutationLogout";

export default function SidenavDashboard() {
  const { mutate: logout } = useMutationLogout();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

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
  ];

  const footerItems = [
    {
      href: "/perfil",
      label: "Perfil",
      icon: User,
    },
    {
      href: "/configuracoes",
      label: "Configurações",
      icon: Settings,
    },
    {
      href: "/logout",
      label: "Sair",
      icon: LogOut,
    },
  ];

  return (
    <aside className="w-72 h-full min-h-screen flex flex-col bg-background text-slate-700 dark:text-slate-200">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight py-5 px-4">
          Candidatus
        </h1>
        <hr className="border-border" />
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
        <ul className="space-y-2">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex w-full items-center gap-1 px-3 py-4 rounded-lg transition-colors cursor-pointer"
                >
                  <Avatar className="ring-2 ring-white dark:ring-slate-700">
                    <AvatarImage src="https://github.com/mateusleonardo.png" />
                  </Avatar>
                  <div className="flex-1 flex flex-col items-start text-left">
                    <span className="text-sm font-semibold">
                      Mateus Leonardo
                    </span>
                    <span className="text-xs">
                      mateus_leonardo1997@hotmail.com
                    </span>
                  </div>
                  <MoreVerticalIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 text-slate-700  dark:text-slate-200 border shadow-lg"
                align="end"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer focus:bg-accent hover:bg-accent hover:text-accent-foreground">
                    <User className="size-4" />
                    <span>Minha conta</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer focus:bg-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <LogOut className="size-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
