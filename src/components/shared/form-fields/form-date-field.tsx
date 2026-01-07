import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface FormDateFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormDateField<T extends FieldValues>({
  label,
  name,
  control,
  errors,
  required = false,
  disabled = false,
  className,
}: FormDateFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={`grid gap-3 ${className || ""}`}>
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker date={field.value} onChange={field.onChange} />
        )}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
