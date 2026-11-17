import { ArrowDown, ArrowUp, Ellipsis, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { OrderStat, TrendDirection } from "@/features/orders/types";

const TREND: Record<
  TrendDirection,
  { icon: LucideIcon | null; className: string }
> = {
  up: { icon: ArrowUp, className: "text-success" },
  down: { icon: ArrowDown, className: "text-error" },
  neutral: { icon: null, className: "text-muted-foreground" },
};

const numberFormat = new Intl.NumberFormat("en-US");

export function OrderStatCard({ stat }: { stat: OrderStat }) {
  const trend = TREND[stat.trend.direction];
  const TrendIcon = trend.icon;

  return (
    <Card className="gap-0 rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.2)] ring-0">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-lg font-medium text-foreground">
          {stat.title}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`More options for ${stat.title}`}
          className="size-6 shrink-0 text-muted-foreground"
        >
          <Ellipsis className="size-5" aria-hidden />
        </Button>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <p className="text-[28px] leading-[34px] font-bold text-foreground">
          {numberFormat.format(stat.value)}
        </p>
        <span
          className={cn(
            "mb-0.5 inline-flex items-center text-sm",
            trend.className,
          )}
        >
          {TrendIcon && <TrendIcon className="size-4" aria-hidden />}
          {stat.trend.percent}%
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{stat.period}</p>
    </Card>
  );
}
