import { ORDER_TABS } from "./types";
import { TAB_STATUSES } from "./constants";
import type {
  Order,
  OrderQuery,
  OrdersPage,
  OrderSortKey,
  OrderTab,
  SortDirection,
} from "./types";

function filterByTab(orders: readonly Order[], tab: OrderTab): Order[] {
  const statuses = TAB_STATUSES[tab];
  return statuses
    ? orders.filter((o) => statuses.includes(o.status))
    : [...orders];
}

function comparator(key: OrderSortKey, dir: SortDirection) {
  const factor = dir === "asc" ? 1 : -1;
  return (a: Order, b: Order) => {
    const diff =
      key === "price" ? a.price - b.price : a.date.localeCompare(b.date);
    // Tie-break on id so ordering is stable across pages.
    return diff !== 0 ? diff * factor : a.id.localeCompare(b.id);
  };
}

export function queryOrders(
  orders: readonly Order[],
  query: OrderQuery,
): OrdersPage {
  const term = query.search.trim().toLowerCase();
  const searched = term
    ? orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(term) ||
          o.productName.toLowerCase().includes(term),
      )
    : orders;

  const tabCounts = Object.fromEntries(
    ORDER_TABS.map((tab) => [tab, filterByTab(searched, tab).length]),
  ) as Record<OrderTab, number>;

  const sorted = filterByTab(searched, query.tab).sort(
    comparator(query.sortKey, query.sortDir),
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / query.pageSize));
  const page = Math.min(Math.max(1, query.page), totalPages);
  const start = (page - 1) * query.pageSize;

  return {
    items: sorted.slice(start, start + query.pageSize),
    total: sorted.length,
    page,
    totalPages,
    tabCounts,
  };
}
