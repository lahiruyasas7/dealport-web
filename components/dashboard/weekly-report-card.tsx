"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { WeeklyReportChart } from "./weekly-report-chart";
import {
  weeklyReportThisWeek,
  weeklyReportLastWeek,
} from "@/features/dashboard/mock-data";

type Period = "thisWeek" | "lastWeek";

const metricLabels = [
  { key: "customers", label: "Customers" },
  { key: "totalProducts", label: "Total Products" },
  { key: "stockProducts", label: "Stock Products" },
  { key: "outOfStock", label: "Out of Stock" },
  { key: "revenue", label: "Revenue" },
] as const;

export function WeeklyReportCard() {
  const [period, setPeriod] = useState<Period>("thisWeek");
  const data =
    period === "thisWeek" ? weeklyReportThisWeek : weeklyReportLastWeek;

  return (
    <div className="w-full rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)] lg:h-[460px] lg:w-[739px]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">
          Report for this week
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border p-0.5 text-xs">
            <button
              onClick={() => setPeriod("thisWeek")}
              className={`rounded-full px-3 py-1 ${
                period === "thisWeek"
                  ? "bg-success text-success-foreground"
                  : "text-muted-foreground"
              }`}
            >
              This week
            </button>
            <button
              onClick={() => setPeriod("lastWeek")}
              className={`rounded-full px-3 py-1 ${
                period === "lastWeek"
                  ? "bg-success text-success-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Last week
            </button>
          </div>
          <button aria-label="More options" className="text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {metricLabels.map(({ key, label }) => (
          <div key={key}>
            <p className="text-lg font-semibold text-foreground">
              {data.metrics[key]}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <WeeklyReportChart points={data.points} />
      </div>
    </div>
  );
}
