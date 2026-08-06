import { MoreVertical, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PendingCancelledData } from "@/features/dashboard/types";

export function PendingCancelledCard({ data }: { data: PendingCancelledData }) {
  return (
    <div className="flex w-full flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)] lg:h-[222px] lg:w-[361px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground">{data.title}</h3>
          <p className="text-xs text-muted-foreground">{data.period}</p>
        </div>
        <button aria-label="More options" className="text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-8 ">
        <div>
          <p className="text-sm text-black font-normal">Pending</p>
          <div className="flex justify-start items-center gap-2">
            {" "}
            <p className="text-[32px] font-bold leading-tight text-foreground">
              {data.pending.value}
            </p>
            <p className="text-[16px] text-muted-foreground">
              {data.pending.sublabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-sm text-black font-normal">Canceled</p>
            <div className="flex justify-start items-center gap-2">
              <p className="text-[32px] font-bold leading-tight text-foreground">
                {data.canceled.value}
              </p>
              <div className="flex items-center gap-1 text-[16px] text-error">
                <ArrowDown className="h-4 w-4" />
                <span>{data.canceled.trendValue}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="flex justify-end items-center">
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
