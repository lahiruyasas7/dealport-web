import { MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StatCardData } from "@/features/dashboard/types";

export function StatCard({ data }: { data: StatCardData }) {
  const TrendIcon = data.trendDirection === "up" ? ArrowUp : ArrowDown;
  const trendColor =
    data.trendDirection === "up" ? "text-success" : "text-error";

  return (
    <div className="flex w-full flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)] lg:h-[222px] lg:w-[361px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.period}</p>
        </div>
        <button aria-label="More options" className="text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div>
        <div className="flex justify-start items-center gap-3">
          <p className="text-[32px] font-bold leading-tight text-foreground">
            {data.value}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[16px]">
            <span className="text-muted-foreground">{data.trendLabel}</span>
            <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
            <span className={trendColor}>{data.trendValue}%</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {data.previousLabel}{" "}
          <span className="text-primary font-bold">{data.previousValue}</span>
        </p>
      </div>
      <div className="flex justify-end items-center">
        <Button
          variant="outline"
          className="h-8 w-24 rounded-full text-sm text-primary border-primary"
        >
          Details
        </Button>
      </div>
    </div>
  );
}
