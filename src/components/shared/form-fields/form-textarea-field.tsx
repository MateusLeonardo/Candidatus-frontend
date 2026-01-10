import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function FormTextareaField<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder,
  required = false,
  disabled = false,
  rows,
}: FormTextareaFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="grid gap-3">
      <Label htmlFor={name as string}>{label}</Label>
      <Textarea
        id={name as string}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        className="h-32"
        {...register(name)}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
