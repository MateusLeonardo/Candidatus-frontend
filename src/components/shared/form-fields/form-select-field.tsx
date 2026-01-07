import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormSelectField<T extends FieldValues>({
  label,
  name,
  control,
  errors,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  className,
}: FormSelectFieldProps<T>) {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={`grid gap-3 ${className || ""}`}>
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value ? field.value.toString() : ""}
            onValueChange={(value) => {
              const numValue = Number(value);
              field.onChange(isNaN(numValue) ? value : numValue);
            }}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
