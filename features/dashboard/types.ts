export interface StatCardData {
  id: string;
  title: string;
  period: string;
  value: string;
  trendLabel: string;
  trendValue: number;
  trendDirection: 'up' | 'down';
  previousLabel: string;
  previousValue: string;
}

export interface PendingCancelledData {
  title: string;
  period: string;
  pending: { value: number; sublabel: string };
  canceled: { value: number; trendValue: number; trendDirection: 'up' | 'down' };
}