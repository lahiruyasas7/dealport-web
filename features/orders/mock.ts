import type { Order, OrderStat, OrderStatus } from "./types";

const CATALOG = [
  ["Wireless Bluetooth Headphones", 49.99],
  ["Men's T-Shirt", 14.99],
  ["Men's Leather Wallet", 49.99],
  ["Memory Foam Pillow", 39.99],
  ["Adjustable Dumbbells", 14.99],
  ["Coffee Maker", 79.99],
  ["Casual Baseball Cap", 49.99],
  ["Full HD Webcam", 39.99],
  ["Smart LED Color Bulb", 79.99],
] as const;

const STATUS_CYCLE: readonly OrderStatus[] = [
  "delivered",
  "pending",
  "delivered",
  "shipped",
  "delivered",
  "cancelled",
  "delivered",
  "pending",
];

// Deterministic (no Math.random) so server and client render the same data.
export const ordersMock: readonly Order[] = Array.from(
  { length: 240 },
  (_, i) => {
    const [productName, price] = CATALOG[i % CATALOG.length];
    const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
    return {
      id: `order-${i + 1}`,
      orderNumber: `#ORD${String(i + 1).padStart(4, "0")}`,
      productName,
      price,
      date: new Date(Date.UTC(2025, 0, 1 + Math.floor(i / 3)))
        .toISOString()
        .slice(0, 10),
      status,
      paymentStatus: status === "cancelled" || i % 3 === 1 ? "unpaid" : "paid",
    };
  },
);

export const orderStatsMock: readonly OrderStat[] = [
  {
    id: "total",
    title: "Total Orders",
    value: 1240,
    period: "Last 7 days",
    trend: { direction: "down", percent: 14.4 },
  },
  {
    id: "new",
    title: "New Orders",
    value: 240,
    period: "Last 7 days",
    trend: { direction: "down", percent: 20 },
  },
  {
    id: "completed",
    title: "Completed Orders",
    value: 960,
    period: "Last 7 days",
    trend: { direction: "neutral", percent: 85 },
  },
  {
    id: "cancelled",
    title: "Cancelled Orders",
    value: 87,
    period: "Last 7 days",
    trend: { direction: "down", percent: 5 },
  },
];
