import type {
  OrderFilters,
  OrderSortKey,
  OrderStatus,
  OrderTab,
} from "./types";

export const ORDERS_PAGE_SIZE = 10;

export const DEFAULT_ORDER_FILTERS: OrderFilters = {
  tab: "all",
  search: "",
  sortKey: "date",
  sortDir: "desc",
  page: 1,
};

export const ORDER_TAB_CONFIG: readonly {
  value: OrderTab;
  label: string;
  showCount?: boolean;
}[] = [
  { value: "all", label: "All order", showCount: true },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

/** Which order statuses each tab shows. `null` means no status filter. */
export const TAB_STATUSES: Record<OrderTab, readonly OrderStatus[] | null> = {
  all: null,
  completed: ["delivered"],
  pending: ["pending", "shipped"],
  cancelled: ["cancelled"],
};

export const SORT_OPTIONS: readonly { value: OrderSortKey; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "price", label: "Price" },
];
