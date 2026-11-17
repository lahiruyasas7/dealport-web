"use client";

import { useOrderStats } from "@/features/orders/hooks/use-orders";
import { OrderStatCard } from "./order-stat-card";

export function OrderStatsRow() {
  const { data, isLoading, isError } = useOrderStats();

  if (isError) {
    return (
      <p role="alert" className="text-sm text-error">
        Failed to load order statistics.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-[135px] animate-pulse rounded-lg bg-muted"
            />
          ))
        : data?.map((stat) => <OrderStatCard key={stat.id} stat={stat} />)}
    </div>
  );
}
