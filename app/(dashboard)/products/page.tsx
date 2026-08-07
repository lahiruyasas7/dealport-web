"use client";
import { useState } from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useProducts } from "@/features/products/hooks/use-products";
import { ProductSearchBar } from "@/components/products/product-search-bar";
import { ProductTable } from "@/components/products/product-table";
import { ProductPagination } from "@/components/products/product-pagination";
import { Button } from "@/components/ui/button";
import { ProductCategoryFilter } from "@/components/products/product-cetegory-filter";

export default function ProductListPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useProducts({
    search: debouncedSearch || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId,
    page,
    limit: 10,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Product List</h1>
        <Button className="rounded-md w-[142px] h-12 text-[16px] bg-sidebar-active">
          <Link href="/products/add" className="flex items-center gap-2">
            <CirclePlus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ProductSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <ProductCategoryFilter
          value={categoryId}
          onChange={(v) => {
            setCategoryId(v ?? "all");
            setPage(1);
          }}
        />
      </div>

      <ProductTable data={data} isLoading={isLoading} isError={isError} />

      {data && (
        <ProductPagination
          page={data.meta.page}
          totalPages={data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
