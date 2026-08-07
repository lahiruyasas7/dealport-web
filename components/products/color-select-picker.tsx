"use client";
import { Check } from "lucide-react";

const PALETTE = ["#A7F3D0", "#FBCFE8", "#BFDBFE", "#FDE68A", "#1F2937"];

export function ColorSwatchPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (c: string[]) => void;
}) {
  function toggle(hex: string) {
    onChange(
      value.includes(hex) ? value.filter((c) => c !== hex) : [...value, hex],
    );
  }
  return (
    <div className="flex gap-2">
      {PALETTE.map((hex) => (
        <button
          key={hex}
          type="button"
          onClick={() => toggle(hex)}
          className="flex h-8 w-8 items-center justify-center rounded-md border"
          style={{ backgroundColor: hex }}
          aria-label={hex}
        >
          {value.includes(hex) && (
            <Check className="h-4 w-4 text-foreground/70" />
          )}
        </button>
      ))}
    </div>
  );
}
