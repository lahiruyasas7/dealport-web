"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageItems } from "@/lib/pagination";
import { cn } from "@/lib/utils";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function DataPagination({ page, totalPages, onPageChange, className }: DataPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Previous
      </Button>

      <ul className="hidden items-center gap-2 sm:flex">
        {getPageItems(page, totalPages).map((item, i) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${i}`} aria-hidden className="px-2 text-muted-foreground">
              …
            </li>
          ) : (
            <li key={item}>
              <Button
                type="button"
                size="icon"
                variant={item === page ? "default" : "ghost"}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className="size-9"
              >
                {item}
              </Button>
            </li>
          ),
        )}
      </ul>

      {/* Compact indicator on mobile, where the number list is hidden. */}
      <p className="text-sm text-muted-foreground sm:hidden" aria-live="polite">
        Page {page} of {totalPages}
      </p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </nav>
  );
}