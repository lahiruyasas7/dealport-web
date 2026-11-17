"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { DataPagination } from "@/components/shared/data-pagination";
import { ORDERS_PAGE_SIZE } from "@/features/orders/constants";
import { useOrderFilters } from "@/features/orders/hooks/use-order-filters";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { useRowSelection } from "@/features/orders/hooks/use-row-selection";
import type { Order } from "@/features/orders/types";
import { OrderPageHeader } from "./order-page-header";
import { OrderStatsRow } from "./order-stats-row";
import { OrderTable } from "./order-table";
import { OrderToolbar } from "./order-toolbar";

const NO_ORDERS: readonly Order[] = [];

export function OrdersView() {
  const {
    filters,
    setTab,
    setSearch,
    setSortKey,
    toggleSortDir,
    setPage,
    reset,
  } = useOrderFilters();

  const query = useMemo(
    () => ({ ...filters, pageSize: ORDERS_PAGE_SIZE }),
    [filters],
  );
  const { data, isLoading, isError, refetch } = useOrders(query);

  const orders = data?.items ?? NO_ORDERS;
  const visibleIds = useMemo(() => orders.map((o) => o.id), [orders]);
  const selection = useRowSelection(visibleIds);

  // The query clamps out-of-range pages, so trust the response over the URL.
  const page = data?.page ?? filters.page;

  return (
    <div className="space-y-6">
      <OrderPageHeader />
      <OrderStatsRow />

      <Card className="gap-6 rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.2)] ring-0">
        <OrderToolbar
          filters={filters}
          counts={data?.tabCounts}
          onTabChange={setTab}
          onSearchChange={setSearch}
          onSortKeyChange={setSortKey}
          onToggleSortDir={toggleSortDir}
          onReset={reset}
        />

        <OrderTable
          orders={orders}
          startIndex={(page - 1) * ORDERS_PAGE_SIZE}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
          selectedIds={selection.selected}
          allSelected={selection.allSelected}
          someSelected={selection.someSelected}
          onToggleRow={selection.toggle}
          onToggleAll={selection.toggleAll}
        />

        <DataPagination
          page={page}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
}
