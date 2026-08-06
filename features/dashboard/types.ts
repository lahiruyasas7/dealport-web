export interface StatCardData {
  id: string;
  title: string;
  period: string;
  value: string;
  trendLabel: string;
  trendValue: number;
  trendDirection: "up" | "down";
  previousLabel: string;
  previousValue: string;
}

export interface PendingCancelledData {
  title: string;
  period: string;
  pending: { value: number; sublabel: string };
  canceled: {
    value: number;
    trendValue: number;
    trendDirection: "up" | "down";
  };
}

export interface WeeklyReportMetrics {
  customers: string;
  totalProducts: string;
  stockProducts: string;
  outOfStock: string;
  revenue: string;
}

export interface WeeklyReportPoint {
  day: string;
  value: number;
}

export interface WeeklyReportData {
  metrics: WeeklyReportMetrics;
  points: WeeklyReportPoint[];
}

export type TransactionStatus = 'Paid' | 'Pending';

export interface Transaction {
  no: number;
  customerId: string;
  orderDate: string;
  status: TransactionStatus;
  amount: string;
}
