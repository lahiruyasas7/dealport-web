import Image from "next/image";
import { ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CountrySales = {
  code: string;
  country: string;
  sales: number;
  /** Signed % change. Positive renders green, negative renders red. */
  change: number;
  /** Share of total, 0–100. Drives the progress bar. */
  share: number;
  flagSrc: string;
};

export type ActiveUsersCardProps = {
  activeUsers: number;
  /** Users per minute for the last N minutes. Bars scale to the max value. */
  perMinute: number[];
  countries: CountrySales[];
  onViewInsight?: () => void;
  className?: string;
};

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function ActiveUsersCard({
  activeUsers,
  perMinute,
  countries,
  onViewInsight,
  className,
}: ActiveUsersCardProps) {
  const max = Math.max(...perMinute, 1);

  return (
    <Card
      className={cn(
        "h-full gap-0 overflow-hidden rounded-lg py-0 shadow-[0_1px_3px_rgba(0,0,0,0.2)] ring-0",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm tracking-[-0.02em] text-primary">
            Users in last 30 minutes
          </p>
          <p className="text-[32px] leading-8 font-bold tracking-[-0.02em] text-foreground">
            {compact.format(activeUsers)}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="size-6 text-muted-foreground"
        >
          <EllipsisVertical className="size-5" />
        </Button>
      </div>

      {/* Users per minute */}
      <div className="mt-6 px-5 ">
        <p className="text-sm font-medium tracking-[-0.02em] text-muted-foreground">
          Users per minute
        </p>
        <div
          role="img"
          aria-label="Bar chart of users per minute"
          className="mt-3 flex h-[35px] items-end gap-[3px]"
        >
          {perMinute.map((value, i) => (
            <span
              key={i}
              className="flex-1 rounded-[2px] bg-chart-1"
              style={{ height: `${(value / max) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Sales by country */}
      <div className="mt-6 flex items-center justify-between px-5 text-lg leading-[26px] font-semibold tracking-[-0.02em] text-foreground">
        <h3>Sales by Country</h3>
        <span>Sales</span>
      </div>

      <div className="relative pt-5 pb-4">
        <Image
          src="/images/us-map.png"
          alt="us map"
          fill
          sizes="361px"
          aria-hidden
          className="pointer-events-none object-cover"
        />
        <ul className="relative flex flex-col gap-[26px] px-5">
          {countries.map((c) => (
            <CountryRow key={c.code} {...c} />
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-4 pt-1 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={onViewInsight}
          className="h-8 w-full rounded-full border-primary bg-transparent px-3 text-sm font-normal tracking-[-0.02em] text-primary hover:bg-primary/5 hover:text-primary"
        >
          View Insight
        </Button>
      </div>
    </Card>
  );
}

function CountryRow({ country, sales, change, share, flagSrc }: CountrySales) {
  const positive = change >= 0;
  const TrendIcon = positive ? ChevronUp : ChevronDown;

  return (
    <li className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={flagSrc}
          alt=""
          width={34}
          height={34}
          className="size-[34px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm leading-5 font-semibold text-foreground">
            {compact.format(sales)}
          </span>
          <span className="text-xs text-muted-foreground">{country}</span>
        </div>
      </div>

      <div className="flex w-[179px] shrink-0 flex-col items-end gap-[3px]">
        <span
          className={cn(
            "flex items-center gap-[2.7px] text-[10px] leading-[14px] font-semibold",
            positive ? "text-success" : "text-error",
          )}
        >
          <TrendIcon className="size-[13.5px]" aria-hidden />
          {Math.abs(change).toFixed(1)}%
        </span>
        <div
          role="progressbar"
          aria-label={`${country} share of sales`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={share}
          className="h-1.5 w-full rounded-full bg-primary/10"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${share}%` }}
          />
        </div>
      </div>
    </li>
  );
}
