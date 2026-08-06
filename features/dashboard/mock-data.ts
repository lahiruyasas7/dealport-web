import type { StatCardData, PendingCancelledData } from "./types";

export const statCards: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total Sales",
    period: "Last 7 days",
    value: "$350K",
    trendLabel: "Sales",
    trendValue: 10.4,
    trendDirection: "up",
    previousLabel: "Previous 7days",
    previousValue: "($235)",
  },
  {
    id: "total-orders",
    title: "Total Orders",
    period: "Last 7 days",
    value: "10.7K",
    trendLabel: "order",
    trendValue: 14.4,
    trendDirection: "up",
    previousLabel: "Previous 7days",
    previousValue: "(7.6k)",
  },
];

export const pendingCancelledData: PendingCancelledData = {
  title: "Pending & Canceled",
  period: "Last 7 days",
  pending: { value: 509, sublabel: "user 204" },
  canceled: { value: 94, trendValue: 14.4, trendDirection: "down" },
};
