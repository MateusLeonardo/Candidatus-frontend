"use client";
import { ModeToggle } from "../mode-toggle";
import { useUserContext } from "@/providers/user-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, MoreVertical } from "lucide-react";
import { mutationLogout } from "@/features/auth/hooks/mutation-logout";

export function Header() {
  const { user } = useUserContext();
  const { mutate: logout } = mutationLogout();

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-[65px]">
      <div className="flex justify-end items-center h-full px-8">
        <div className="flex items-center gap-4">
          <ModeToggle />

          {user && (
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
                    {user.email}
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
          )}
        </div>
      </div>
    </header>
  );
}
