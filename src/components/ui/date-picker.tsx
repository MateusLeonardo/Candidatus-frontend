"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface DatePickerProps {
  date?: Date;
  onChange: (date?: Date) => void;
}

export function DatePicker({ date, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Input
        readOnly
        value={date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : ""}
        placeholder="Selecione uma data"
        className="pr-10 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Selecionar data</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              onChange(selected);
              setOpen(false);
            }}
            captionLayout="dropdown"
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
