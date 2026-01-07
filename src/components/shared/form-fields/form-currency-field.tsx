import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface FormCurrencyFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormCurrencyField<T extends FieldValues>({
  label,
  name,
  control,
  errors,
  placeholder = "Ex: R$ 1000,00",
  required = false,
  disabled = false,
  className,
}: FormCurrencyFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={`grid gap-3 ${className || ""}`}>
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type="text"
            placeholder={placeholder}
            value={formatCurrency(field.value ?? 0)}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              const currencyValue = Number(numericValue) / 100;
              field.onChange(currencyValue);
            }}
            disabled={disabled}
            required={required}
          />
        )}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
