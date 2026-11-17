export const ORDER_STATUSES = ["pending", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_STATUSES = ["paid", "unpaid"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export type Order = {
  id: string;
  orderNumber: string;
  productName: string;
  productImage?: string;
  /** ISO date, e.g. "2025-01-01" */
  date: string;
  price: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
};

export const ORDER_TABS = ["all", "completed", "pending", "cancelled"] as const;
export type OrderTab = (typeof ORDER_TABS)[number];

export const ORDER_SORT_KEYS = ["date", "price"] as const;
export type OrderSortKey = (typeof ORDER_SORT_KEYS)[number];

export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export type OrderFilters = {
  tab: OrderTab;
  search: string;
  sortKey: OrderSortKey;
  sortDir: SortDirection;
  page: number;
};

export type OrderQuery = OrderFilters & { pageSize: number };

export type OrdersPage = {
  items: Order[];
  total: number;
  page: number;
  totalPages: number;
  tabCounts: Record<OrderTab, number>;
};

export type TrendDirection = "up" | "down" | "neutral";

export type OrderStat = {
  id: string;
  title: string;
  value: number;
  period: string;
  trend: { direction: TrendDirection; percent: number };
};