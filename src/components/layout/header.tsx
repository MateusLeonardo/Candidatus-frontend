import { ModeToggle } from "../mode-toggle";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 h-[65px]">
      <div className="flex justify-end items-center h-full px-8">
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
