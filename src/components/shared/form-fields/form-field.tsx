import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rightElement?: ReactNode;
}

export function FormField<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className,
  rightElement,
}: FormFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={`grid gap-3 ${className || ""}`}>
      <Label htmlFor={name as string}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          id={name as string}
          type={type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={rightElement ? "flex-1" : ""}
          {...register(name)}
        />
        {rightElement}
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
