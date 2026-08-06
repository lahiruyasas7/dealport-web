import { StatCard } from './stat-card';
import { PendingCancelledCard } from './pending-cancelled-card';
import { statCards, pendingCancelledData } from '@/features/dashboard/mock-data';

export function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statCards.map((card) => (
        <StatCard key={card.id} data={card} />
      ))}
      <PendingCancelledCard data={pendingCancelledData} />
    </div>
  );
}