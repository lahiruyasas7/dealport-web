import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api";
import { ProductFormValues } from "../schemas/product.schema";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductFormValues) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}