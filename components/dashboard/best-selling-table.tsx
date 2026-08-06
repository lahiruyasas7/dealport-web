"use client";

import Image from "next/image";
import { useProducts } from "@/features/products/hooks/use-products";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Package, SlidersHorizontal } from "lucide-react";

export function BestSellingTable() {
  const { data, isLoading, isError } = useProducts({ limit: 5 });

  const products = data?.data.slice(0, 5) ?? [];

  return (
    <div className="w-full max-w-[739px] h-[430px] rounded-xl bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <h3 className="text-lg font-medium text-foreground">
          Best selling product
        </h3>
        <Button
          size="sm"
          className="h-8 gap-1.5 rounded-sm bg-sidebar-active px-4 text-xs font-medium text-white hover:bg-sidebar-active/90"
        >
          Filter
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-4 flex-1 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="mt-4 flex-1 flex items-center justify-center">
          <p className="text-sm text-error">Failed to load products.</p>
        </div>
      )}

      {/* Table */}
      {data && (
        <div className="mt-4 flex-1 overflow-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-sidebar-active/10">
                <th className="py-3 px-4 text-xs font-medium text-muted-foreground rounded-l-md">
                  PRODUCT
                </th>
                <th className="py-3 px-4 text-xs font-medium text-muted-foreground">
                  TOTAL ORDER
                </th>
                <th className="py-3 px-4 text-xs font-medium text-muted-foreground">
                  STATUS
                </th>
                <th className="py-3 px-4 text-xs font-medium text-muted-foreground text-right rounded-r-md">
                  PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 overflow-hidden rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Package className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {(product as any).totalOrder ?? "-"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${
                          product.stockStatus === "IN_STOCK"
                            ? "bg-success"
                            : "bg-error"
                        }`}
                      />
                      <span
                        className={
                          product.stockStatus === "IN_STOCK"
                            ? "text-success font-medium"
                            : "text-error font-medium"
                        }
                      >
                        {product.stockStatus === "IN_STOCK"
                          ? "Stock"
                          : "Stock out"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-foreground">
                    {formatPrice(product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex justify-end shrink-0">
        <Button
          variant="outline"
          className="h-9 w-24 rounded-full text-xs font-medium border-border hover:bg-muted"
        >
          Details
        </Button>
      </div>
    </div>
  );
}
