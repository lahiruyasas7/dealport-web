import { Suspense } from "react";
import type { Metadata } from "next";
import { OrdersView } from "@/components/orders/orders-view";

export const metadata: Metadata = { title: "Order Management" };

export default function OrdersPage() {
  // useSearchParams (filters live in the URL) requires a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <OrdersView />
    </Suspense>
  );
}
