"use client";

import { ArrowUpDown, Check, Ellipsis, ListFilter } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchInput } from "@/components/shared/search-input";
import { SORT_OPTIONS } from "@/features/orders/constants";
import { cn } from "@/lib/utils";
import type { OrderFilters, OrderSortKey, OrderTab } from "@/features/orders/types";
import { OrderStatusTabs } from "./order-status-tabs";

type OrderToolbarProps = {
  filters: OrderFilters;
  counts?: Record<OrderTab, number>;
  onTabChange: (tab: OrderTab) => void;
  onSearchChange: (value: string) => void;
  onSortKeyChange: (key: OrderSortKey) => void;
  onToggleSortDir: () => void;
  onReset: () => void;
};

const iconTrigger = cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10");

export function OrderToolbar({
  filters,
  counts,
  onTabChange,
  onSearchChange,
  onSortKeyChange,
  onToggleSortDir,
  onReset,
}: OrderToolbarProps) {
  const dirLabel = filters.sortDir === "asc" ? "ascending" : "descending";

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <OrderStatusTabs value={filters.tab} counts={counts} onChange={onTabChange} />

      <div className="flex items-center gap-3">
        <SearchInput
          value={filters.search}
          onChange={onSearchChange}
          placeholder="Search order report"
          ariaLabel="Search orders"
          className="min-w-0 flex-1 lg:w-64 lg:flex-none"
        />

        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Sort by" className={iconTrigger}>
            <ListFilter className="size-5" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SORT_OPTIONS.map(({ value, label }) => (
              <DropdownMenuItem key={value} onClick={() => onSortKeyChange(value)}>
                <span className="flex-1">{label}</span>
                {filters.sortKey === value && <Check className="size-4" aria-hidden />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-10"
          aria-label={`Sort direction: ${dirLabel}. Click to reverse.`}
          onClick={onToggleSortDir}
        >
          <ArrowUpDown className="size-5" aria-hidden />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger aria-label="More options" className={iconTrigger}>
            <Ellipsis className="size-5" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onReset}>Reset filters</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}