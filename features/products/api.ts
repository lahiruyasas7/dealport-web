import { apiClient } from '@/lib/api-client';
import { PaginatedProducts, ProductListParams } from '../dashboard/types';

export function getProducts(params: ProductListParams, signal?: AbortSignal) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
  );
  return apiClient.get<PaginatedProducts>(`/products?${query}`, signal);
}