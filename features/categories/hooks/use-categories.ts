import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 5 * 60 * 1000, // categories barely change — cache longer than products
  });
}
