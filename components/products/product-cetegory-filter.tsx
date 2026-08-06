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
  onChange: (v: string | null) => void;
}) {
  const { data: categories, isLoading } = useCategories();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue
          placeholder={isLoading ? "Loading..." : "All categories"}
        />
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
