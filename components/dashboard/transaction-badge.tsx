import type { TransactionStatus } from "@/features/dashboard/types";

const config: Record<TransactionStatus, { dot: string; text: string }> = {
  Paid: { dot: "bg-success", text: "text-success" },
  Pending: { dot: "bg-pending", text: "text-pending" },
};

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  const { dot, text } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
