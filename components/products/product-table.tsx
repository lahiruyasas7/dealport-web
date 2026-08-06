"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteProduct } from "@/features/products/hooks/use-delete-product";
import { formatPrice } from "@/lib/format";
import { StockStatusBadge } from "./stock-status-badge";
import { DeleteProductDialog } from "./delete-product-dialog";
import { PaginatedProducts, Product } from "@/features/dashboard/types";

export function ProductTable({
  data,
  isLoading,
  isError,
}: {
  data: PaginatedProducts | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const deleteProduct = useDeleteProduct();

  return (
    <>
      <div className="overflow-x-auto rounded-lg bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="px-4 py-3 font-normal">Product</th>
              <th className="px-4 py-3 font-normal">Category</th>
              <th className="px-4 py-3 font-normal">Price</th>
              <th className="px-4 py-3 font-normal">Stock</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td colSpan={6} className="px-4 py-4">
                    <div className="h-6 animate-pulse rounded bg-muted" />
                  </td>
                </tr>
              ))}
            {isError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-error">
                  Failed to load products.
                </td>
              </tr>
            )}
            {data && data.data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No products found.
                </td>
              </tr>
            )}
            {data?.data.map((product) => (
              <tr key={product.id} className="border-b last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium text-foreground">
                    {product.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.categories[0]?.name ?? "-"}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.isUnlimited
                    ? "Unlimited"
                    : (product.stockQuantity ?? "-")}
                </td>
                <td className="px-4 py-3">
                  <StockStatusBadge status={product.stockStatus} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/products/${product.id}/edit`}
                      aria-label="Edit product"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      aria-label="Delete product"
                      onClick={() => setDeleteTarget(product)}
                      className="text-muted-foreground hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteProductDialog
        open={!!deleteTarget}
        productName={deleteTarget?.name ?? ""}
        isPending={deleteProduct.isPending}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() =>
          deleteTarget &&
          deleteProduct.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          })
        }
      />
    </>
  );
}
