import { ReactNode } from "react";

interface FormSelectsRowProps {
  children: ReactNode;
  className?: string;
}

export function FormSelectsRow({ children, className }: FormSelectsRowProps) {
  return (
    <div className={`flex gap-3 justify-between ${className || ""}`}>
      {children}
    </div>
  );
}
