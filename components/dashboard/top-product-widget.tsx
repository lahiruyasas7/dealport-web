"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/features/products/hooks/use-products";
import { formatPrice } from "@/lib/format";
import { Search, Package } from "lucide-react";

export function TopProductsWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useProducts({ limit: 5 });

  const filteredProducts = useMemo(() => {
    if (!data?.data) return [];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return data.data.slice(0, 4);
    return data.data.filter((p) => p.name.toLowerCase().includes(query));
  }, [data, searchQuery]);

  return (
    <div className="w-full max-w-[292px] rounded-xl bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Top Products</h3>
        <Link
          href="/products"
          className="text-sm font-medium text-sidebar-active hover:text-sidebar-active/80 transition-colors"
        >
          All product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg bg-muted/60 border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-active/30 transition-all"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="mt-4 text-sm text-error">Failed to load products.</p>
      )}

      {/* Empty */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground text-center py-6">
          No products found.
        </p>
      )}

      {/* List */}
      <ul className="mt-4 space-y-3">
        {filteredProducts.map((product) => (
          <li key={product.id} className="flex items-center gap-3">
            {/* Image */}
            <div className="h-11 w-11 overflow-hidden rounded-lg bg-muted flex items-center justify-center shrink-0">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Item #{product.id.slice(-6).toUpperCase()}
              </p>
            </div>

            {/* Price */}
            <p className="text-sm font-semibold text-foreground shrink-0">
              {formatPrice(product.price)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}