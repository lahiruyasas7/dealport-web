import { BestSellingTable } from "@/components/dashboard/best-selling-table";
import { StatCardsRow } from "@/components/dashboard/stat-cards-row";
import { TopProductsWidget } from "@/components/dashboard/top-product-widget";
import { TransactionCard } from "@/components/dashboard/transaction-card";
import { WeeklyReportCard } from "@/components/dashboard/weekly-report-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatCardsRow />
      <WeeklyReportCard />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TransactionCard />
        <TopProductsWidget />
      </div>

      <BestSellingTable />
    </div>
  );
}
