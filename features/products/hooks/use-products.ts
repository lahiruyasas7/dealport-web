import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../api";
import { ProductListParams } from "@/features/dashboard/types";

export function useProducts(params: ProductListParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: ({ signal }) => getProducts(params, signal),
    placeholderData: keepPreviousData,
  });
}
