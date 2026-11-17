"use client";

import { useEffect, useEffectEvent, useState } from "react";
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
  const [emitted, setEmitted] = useState(value); // last value sent to the parent
  const [prevValue, setPrevValue] = useState(value);

  // Sync only EXTERNAL changes (reset, back button), not the echo of our own emit.
  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== emitted) {
      setText(value);
      setEmitted(value);
    }
  }

  const emit = useEffectEvent((next: string) => {
    setEmitted(next);
    onChange(next);
  });

  useEffect(() => {
    if (text === emitted) return; // already sent
    const id = setTimeout(() => emit(text), debounceMs);
    return () => clearTimeout(id);
  }, [text, emitted, debounceMs]); // `emit` is intentionally not a dependency

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
