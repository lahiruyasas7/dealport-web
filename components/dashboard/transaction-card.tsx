"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { transactions } from "@/features/dashboard/mock-data";
import { TransactionStatusBadge } from "./transaction-badge";

export function TransactionCard() {
  return (
    <div className="w-full rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)] lg:h-[420px] max-w-[808px]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Transaction</h3>
        <Button
          size="sm"
          className="h-8 gap-1.5 rounded-sm bg-sidebar-active px-4 text-xs font-medium text-white hover:bg-sidebar-active/90"
        >
          Filter
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="py-2 font-normal">No</th>
              <th className="py-2 font-normal">Id Customer</th>
              <th className="py-2 font-normal">Order Date</th>
              <th className="py-2 font-normal">Status</th>
              <th className="py-2 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.no} className="border-b last:border-0">
                <td className="py-3 text-muted-foreground">{tx.no}.</td>
                <td className="py-3 font-medium text-foreground">
                  {tx.customerId}
                </td>
                <td className="py-3 text-muted-foreground">{tx.orderDate}</td>
                <td className="py-3">
                  <TransactionStatusBadge status={tx.status} />
                </td>
                <td className="py-3 text-right font-medium text-foreground">
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          className="h-8 w-24 rounded-full text-xs text-primary border-primary"
        >
          Details
        </Button>
      </div>
    </div>
  );
}
