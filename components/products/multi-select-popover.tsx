"use client";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  id: string;
  name: string;
}

export function MultiSelectPopover({
  label,
  options,
  selected,
  onChange,
  isLoading,
}: {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
}) {
  function toggle(id: string) {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  }
  const selectedNames = options
    .filter((o) => selected.includes(o.id))
    .map((o) => o.name);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm"
          >
            <span className="truncate text-left text-muted-foreground">
              {selectedNames.length
                ? selectedNames.join(", ")
                : `Select your ${label.toLowerCase()}`}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        }
      />
      <PopoverContent className="w-64 p-1" align="start">
        {isLoading && (
          <p className="p-2 text-sm text-muted-foreground">Loading...</p>
        )}
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            {option.name}
            {selected.includes(option.id) && (
              <Check className="h-4 w-4 text-success" />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}