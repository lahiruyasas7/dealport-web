"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks/use-categories";

export function ProductCategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { data: categories, isLoading } = useCategories();

  const selectedLabel =
    value === "all"
      ? isLoading
        ? "Loading..."
        : "All categories"
      : categories?.find((cat) => cat.id === value)?.name || value;

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        // Radix passes string | null; guard against null
        if (v !== null) {
          onChange(v);
        }
      }}
    >
      <SelectTrigger className="w-48">
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All categories</SelectItem>
        {categories?.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
