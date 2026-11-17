"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_ORDER_FILTERS } from "../constants";
import { parseOrderFilters, serializeOrderFilters } from "../filters";
import type { OrderFilters, OrderSortKey, OrderTab } from "../types";

export function useOrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseOrderFilters(searchParams),
    [searchParams],
  );

  const apply = useCallback(
    (next: OrderFilters) => {
      const qs = serializeOrderFilters(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  return useMemo(
    () => ({
      filters,
      // Any filter change goes back to page 1.
      setTab: (tab: OrderTab) => apply({ ...filters, tab, page: 1 }),
      setSearch: (search: string) => apply({ ...filters, search, page: 1 }),
      setSortKey: (sortKey: OrderSortKey) =>
        apply({ ...filters, sortKey, page: 1 }),
      toggleSortDir: () =>
        apply({
          ...filters,
          sortDir: filters.sortDir === "asc" ? "desc" : "asc",
          page: 1,
        }),
      setPage: (page: number) => apply({ ...filters, page }),
      reset: () => apply(DEFAULT_ORDER_FILTERS),
    }),
    [filters, apply],
  );
}
