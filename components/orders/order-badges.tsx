import {
  CircleCheck,
  CircleX,
  Clock,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/features/orders/types";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: LucideIcon; iconClass: string }
> = {
  delivered: {
    label: "Delivered",
    icon: CircleCheck,
    iconClass: "text-success",
  },
  shipped: { label: "Shipped", icon: Truck, iconClass: "text-primary" },
  pending: { label: "Pending", icon: Clock, iconClass: "text-pending" },
  cancelled: { label: "Cancelled", icon: CircleX, iconClass: "text-error" },
};

const PAYMENT_CONFIG: Record<
  PaymentStatus,
  { label: string; textClass: string; dotClass: string }
> = {
  paid: { label: "Paid", textClass: "text-success", dotClass: "bg-success" },
  unpaid: { label: "Unpaid", textClass: "text-error", dotClass: "bg-error" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, icon: Icon, iconClass } = STATUS_CONFIG[status];
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground">
      <Icon className={cn("size-5", iconClass)} aria-hidden />
      {label}
    </span>
  );
}

export function OrderPaymentBadge({ status }: { status: PaymentStatus }) {
  const { label, textClass, dotClass } = PAYMENT_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", textClass)}>
      <span className={cn("size-2 rounded-full", dotClass)} aria-hidden />
      {label}
    </span>
  );
}
