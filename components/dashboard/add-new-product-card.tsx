"use client";

import Image from "next/image";
import { ChevronRight, CirclePlus, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CategoryItem = {
  id: string;
  name: string;
  imageSrc?: string;
};

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  imageSrc?: string;
};

export type AddProductCardProps = {
  categories: CategoryItem[];
  products: ProductItem[];
  onAddNew?: () => void;
  onSelectCategory?: (category: CategoryItem) => void;
  onAddProduct?: (product: ProductItem) => void;
  onSeeMoreCategories?: () => void;
  onSeeMoreProducts?: () => void;
  className?: string;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function AddProductCard({
  categories,
  products,
  onAddNew,
  onSelectCategory,
  onAddProduct,
  onSeeMoreCategories,
  onSeeMoreProducts,
  className,
}: AddProductCardProps) {
  return (
    <Card
      className={cn(
        "h-full w-full gap-0 rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.2)] ring-0",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="truncate text-lg font-bold text-foreground">
          Add New Product
        </h3>
        <Button
          type="button"
          variant="ghost"
          onClick={onAddNew}
          className="h-auto shrink-0 gap-1 p-0 text-sm font-normal tracking-[-0.02em] text-primary hover:bg-transparent hover:text-primary/80"
        >
          <CirclePlus className="size-5" aria-hidden />
          Add New
        </Button>
      </header>

      <section aria-labelledby="add-product-categories" className="mt-2">
        <h4
          id="add-product-categories"
          className="text-sm tracking-[-0.02em] text-muted-foreground"
        >
          Categories
        </h4>
        <ul className="mt-3 flex flex-col gap-3">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelectCategory?.(category)}
                className="flex w-full items-center gap-3 rounded-md bg-card p-1.5 text-left shadow-[0_1px_1.5px_rgba(0,0,0,0.2)] transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Thumb src={category.imageSrc} />
                <span className="min-w-0 flex-1 truncate text-lg tracking-[-0.02em] text-foreground">
                  {category.name}
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-foreground"
                  aria-hidden
                />
              </button>
            </li>
          ))}
        </ul>
        <SeeMore onClick={onSeeMoreCategories} label="See more categories" />
      </section>

      <section aria-labelledby="add-product-products" className="mt-3">
        <h4
          id="add-product-products"
          className="text-sm tracking-[-0.02em] text-muted-foreground"
        >
          Product
        </h4>
        <ul className="mt-3 divide-y divide-border">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-3 py-3 first:pt-0"
            >
              <Thumb src={product.imageSrc} />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="truncate text-sm tracking-[-0.02em] text-foreground">
                  {product.name}
                </span>
                <span className="text-sm font-bold tracking-[-0.02em] text-chart-1">
                  {currency.format(product.price)}
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => onAddProduct?.(product)}
                aria-label={`Add ${product.name}`}
                className="h-7 shrink-0 gap-1 rounded-full bg-chart-1 pr-3 pl-2 text-xs font-medium text-white hover:bg-chart-1/90"
              >
                <CirclePlus className="size-4" aria-hidden />
                Add
              </Button>
            </li>
          ))}
        </ul>
        <SeeMore onClick={onSeeMoreProducts} label="See more products" />
      </section>
    </Card>
  );
}

function Thumb({ src }: { src?: string }) {
  return (
    <div className="relative size-[46px] shrink-0 overflow-hidden rounded-sm border bg-muted">
      {src ? (
        <Image src={src} alt="" fill sizes="46px" className="object-cover" />
      ) : (
        <ImageIcon
          className="absolute inset-0 m-auto size-5 text-muted-foreground"
          aria-hidden
        />
      )}
    </div>
  );
}

function SeeMore({ onClick, label }: { onClick?: () => void; label: string }) {
  return (
    <div className="mt-3 flex justify-center">
      <Button
        type="button"
        variant="link"
        onClick={onClick}
        aria-label={label}
        className="h-auto p-0 text-sm font-normal tracking-[-0.02em] text-primary no-underline hover:underline"
      >
        See more
      </Button>
    </div>
  );
}
