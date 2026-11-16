import { ActiveUsersCard } from "@/components/dashboard/active-users-card";
import { BestSellingTable } from "@/components/dashboard/best-selling-table";
import { StatCardsRow } from "@/components/dashboard/stat-cards-row";
import { TopProductsWidget } from "@/components/dashboard/top-product-widget";
import { TransactionCard } from "@/components/dashboard/transaction-card";
import { WeeklyReportCard } from "@/components/dashboard/weekly-report-card";
import { activeUsersMock } from "@/mock/active-users-card.mock";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatCardsRow />
      <div className="flex justify-between items-center">
        <WeeklyReportCard />
        <ActiveUsersCard {...activeUsersMock} />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        <TransactionCard />
        <TopProductsWidget />
      </div>

      <BestSellingTable />
    </div>
  );
}
