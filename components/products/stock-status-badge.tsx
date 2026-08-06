import { StockStatus } from "@/features/dashboard/types";

export function StockStatusBadge({ status }: { status: StockStatus }) {
  const inStock = status === "IN_STOCK";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${inStock ? "text-success" : "text-error"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-success" : "bg-error"}`}
      />
      {inStock ? "In Stock" : "Stock out"}
    </span>
  );
}
