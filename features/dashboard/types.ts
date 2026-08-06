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

export type StockStatus = 'IN_STOCK' | 'OUT_OF_STOCK';
export type ProductStatus = 'DRAFT' | 'PUBLISHED';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;              // Decimal → string over JSON
  discountedPrice: string | null;
  taxIncluded: boolean;
  stockQuantity: number | null;
  isUnlimited: boolean;
  stockStatus: StockStatus;
  isFeatured: boolean;
  colors: string[];
  images: string[];
  status: ProductStatus;
  categories: Category[];
  tags: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  search?: string;
  status?: ProductStatus;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
