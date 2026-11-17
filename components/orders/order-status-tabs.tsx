import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ORDER_TAB_CONFIG } from "@/features/orders/constants";
import type { OrderTab } from "@/features/orders/types";

type OrderStatusTabsProps = {
  value: OrderTab;
  counts?: Record<OrderTab, number>;
  onChange: (tab: OrderTab) => void;
};

export function OrderStatusTabs({
  value,
  counts,
  onChange,
}: OrderStatusTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as OrderTab)}
      className="max-w-full overflow-x-auto"
    >
      <TabsList aria-label="Filter orders by status">
        {ORDER_TAB_CONFIG.map(({ value: tab, label, showCount }) => (
          <TabsTrigger key={tab} value={tab} className="gap-1.5 px-3">
            {label}
            {showCount && counts && (
              <span className="text-muted-foreground">({counts[tab]})</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
