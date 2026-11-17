"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/features/orders/types";
import { OrderPaymentBadge, OrderStatusBadge } from "./order-badges";

const COLUMN_COUNT = 7;
const SKELETON_ROWS = 10;

type OrderTableProps = {
  orders: readonly Order[];
  /** Zero-based index of the first row, used for the "No." column. */
  startIndex: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  selectedIds: ReadonlySet<string>;
  allSelected: boolean;
  someSelected: boolean;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
};

export function OrderTable({
  orders,
  startIndex,
  isLoading,
  isError,
  onRetry,
  selectedIds,
  allSelected,
  someSelected,
  onToggleRow,
  onToggleAll,
}: OrderTableProps) {
  return (
    <Table className="min-w-[860px]">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-24">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                disabled={orders.length === 0}
                onCheckedChange={() => onToggleAll()}
                aria-label="Select all orders on this page"
              />
              No.
            </div>
          </TableHead>
          <TableHead>Order Id</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading &&
          Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <TableRow key={i}>
              <TableCell colSpan={COLUMN_COUNT} className="py-4">
                <div className="h-6 animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          ))}

        {isError && (
          <TableRow>
            <TableCell colSpan={COLUMN_COUNT} className="py-10 text-center">
              <p role="alert" className="text-error">
                Failed to load orders.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={onRetry}
              >
                Try again
              </Button>
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={COLUMN_COUNT}
              className="py-10 text-center text-muted-foreground"
            >
              No orders match your filters.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          !isError &&
          orders.map((order, index) => {
            const selected = selectedIds.has(order.id);
            return (
              <TableRow
                key={order.id}
                data-state={selected ? "selected" : undefined}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selected}
                      onCheckedChange={() => onToggleRow(order.id)}
                      aria-label={`Select order ${order.orderNumber}`}
                    />
                    <span className="text-muted-foreground tabular-nums">
                      {startIndex + index + 1}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>
                  <ProductCell
                    name={order.productName}
                    image={order.productImage}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {format(parseISO(order.date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>{formatPrice(String(order.price))}</TableCell>
                <TableCell>
                  <OrderPaymentBadge status={order.paymentStatus} />
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

function ProductCell({ name, image }: { name: string; image?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md border bg-muted">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <ImageIcon
            className="absolute inset-0 m-auto size-5 text-muted-foreground"
            aria-hidden
          />
        )}
      </div>
      <span className="line-clamp-2 max-w-40 whitespace-normal">{name}</span>
    </div>
  );
}
