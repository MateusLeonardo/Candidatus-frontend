import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="shadow-md">
      <div className="container mx-auto px-4 py-4">
        <ModeToggle />
      </div>
    </header>
  );
}
