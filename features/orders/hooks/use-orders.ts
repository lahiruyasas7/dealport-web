import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchOrderStats } from "../api";
import type { OrderQuery } from "../types";

export const orderKeys = {
  all: ["orders"] as const,
  list: (query: OrderQuery) => [...orderKeys.all, "list", query] as const,
  stats: () => [...orderKeys.all, "stats"] as const,
};

export function useOrders(query: OrderQuery) {
  return useQuery({
    queryKey: orderKeys.list(query),
    queryFn: () => fetchOrders(query),
    placeholderData: keepPreviousData, // no flash of skeleton between pages
  });
}

export function useOrderStats() {
  return useQuery({
    queryKey: orderKeys.stats(),
    queryFn: fetchOrderStats,
    staleTime: 60_000,
  });
}
