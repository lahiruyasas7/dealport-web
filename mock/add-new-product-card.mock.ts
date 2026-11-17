import { AddProductCardProps } from "@/components/dashboard/add-new-product-card";

export const addProductMock: Pick<
  AddProductCardProps,
  "categories" | "products"
> = {
  categories: [
    { id: "cat-electronic", name: "Electronic" },
    { id: "cat-fashion", name: "Fashion" },
    { id: "cat-home", name: "Home" },
  ],
  products: [
    { id: "prod-1", name: "Smart Fitness Tracker", price: 39.99 },
    { id: "prod-2", name: "Leather Wallet", price: 19.99 },
    { id: "prod-3", name: "Electric Hair Trimmer", price: 34.99 },
  ],
};
