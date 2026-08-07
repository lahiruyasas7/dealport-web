import { apiClient } from "@/lib/api-client";
import {
  PaginatedProducts,
  Product,
  ProductListParams,
} from "../dashboard/types";
import { ProductFormValues } from "./schemas/product.schema";

export function getProducts(params: ProductListParams, signal?: AbortSignal) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [
      string,
      string,
    ][],
  );
  return apiClient.get<PaginatedProducts>(`/products?${query}`, signal);
}

export function createProduct(data: ProductFormValues, signal?: AbortSignal) {
  return apiClient.post<Product>("/products", data, signal);
}
