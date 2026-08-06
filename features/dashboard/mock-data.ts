import type {
  StatCardData,
  PendingCancelledData,
  WeeklyReportData,
  Transaction,
} from "./types";

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

export const weeklyReportThisWeek: WeeklyReportData = {
  metrics: {
    customers: "52k",
    totalProducts: "3.5k",
    stockProducts: "2.5k",
    outOfStock: "0.5k",
    revenue: "250k",
  },
  points: [
    { day: "Sun", value: 22 },
    { day: "Mon", value: 38 },
    { day: "Tue", value: 28 },
    { day: "Wed", value: 14 },
    { day: "Thu", value: 32 },
    { day: "Fri", value: 20 },
    { day: "Sat", value: 42 },
  ],
};

export const weeklyReportLastWeek: WeeklyReportData = {
  metrics: {
    customers: "46k",
    totalProducts: "3.1k",
    stockProducts: "2.2k",
    outOfStock: "0.9k",
    revenue: "210k",
  },
  points: [
    { day: "Sun", value: 18 },
    { day: "Mon", value: 25 },
    { day: "Tue", value: 33 },
    { day: "Wed", value: 21 },
    { day: "Thu", value: 27 },
    { day: "Fri", value: 16 },
    { day: "Sat", value: 30 },
  ],
};

export const transactions: Transaction[] = [
  {
    no: 1,
    customerId: "#6545",
    orderDate: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$64",
  },
  {
    no: 2,
    customerId: "#5412",
    orderDate: "01 Oct | 11:29 am",
    status: "Pending",
    amount: "$557",
  },
  {
    no: 3,
    customerId: "#6622",
    orderDate: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$156",
  },
  {
    no: 4,
    customerId: "#6462",
    orderDate: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$265",
  },
  {
    no: 5,
    customerId: "#6462",
    orderDate: "01 Oct | 11:29 am",
    status: "Paid",
    amount: "$265",
  },
];
