"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function DatePickerField({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (iso: string | undefined) => void;
  placeholder: string;
}) {
  const date = value ? new Date(value) : undefined;
  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm text-muted-foreground"
          >
            {date ? format(date, "dd MMM yyyy") : placeholder}
            <CalendarIcon className="h-4 w-4" />
          </button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => onChange(d ? d.toISOString() : undefined)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
