"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store/configure-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, MoreVertical, User } from "lucide-react";
import { mutationLogout } from "@/features/auth/hooks/mutation-logout";

export function UserMenu() {
  const { email } = useSelector((state: RootState) => state.user);
  const { mutate: logout } = mutationLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 cursor-pointer"
        >
          <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-700">
            <AvatarImage src="https://github.com/mateusleonardo.png" />
          </Avatar>
          <span className="hidden sm:inline-block text-sm font-medium">
            {email && email}
          </span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-slate-700 dark:text-slate-200 border shadow-lg"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer focus:bg-accent hover:bg-accent hover:text-accent-foreground">
            <User className="mr-2 h-4 w-4" />
            <span>Minha conta</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => logout()}
            className="cursor-pointer focus:bg-accent hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}