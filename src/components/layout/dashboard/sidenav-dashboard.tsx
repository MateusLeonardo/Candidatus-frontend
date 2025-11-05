"use client";
import Link from "next/link";
import { Clipboard, Map, MapPin, User, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SidenavDashboard() {
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
    <aside className="bg-[#1f2937] w-64 h-full min-h-screen flex flex-col ">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-white tracking-tight py-5 px-4">
          Candidatus
        </h1>
        <hr className="border-[#374151] border" />
      </div>

      <nav className="flex-1 flex flex-col mt-4">
        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 py-2 px-3 text-white transition-colors duration-300 ${
                  isActive(item.href)
                    ? "bg-[#3b82f6] font-medium"
                    : "hover:bg-[#374151] font-medium"
                }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {footerItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 py-2 px-3 text-white transition-colors duration-300 ${
                  isActive(item.href)
                    ? "bg-[#3b82f6] font-medium"
                    : "hover:bg-[#374151] font-medium"
                }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
