"use client";

import { CirclePlus, Ellipsis } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type OrderPageHeaderProps = {
  onAddOrder?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
};

export function OrderPageHeader({
  onAddOrder,
  onExport,
  onPrint,
}: OrderPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-lg font-bold text-foreground">Order List</h1>

      <div className="flex items-center gap-3">
        <Button type="button" onClick={onAddOrder} className="h-12 gap-2 px-5">
          <CirclePlus className="size-6" aria-hidden />
          Add Order
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 gap-2 px-5",
            )}
          >
            More Action
            <Ellipsis className="size-4" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport}>
              Export orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onPrint}>Print list</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
