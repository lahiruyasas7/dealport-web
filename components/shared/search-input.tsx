"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  debounceMs?: number;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  ariaLabel = "Search",
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const [text, setText] = useState(value);

  // Re-sync when the parent changes the value (e.g. "Reset filters").
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  useEffect(() => {
    if (text === value) return;
    const id = setTimeout(() => onChange(text), debounceMs);
    return () => clearTimeout(id);
  }, [text, value, onChange, debounceMs]);

  return (
    <div className={cn("relative", className)}>
      <Input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-10 pr-10"
      />
      <Search
        className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}
