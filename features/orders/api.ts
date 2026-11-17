import { ordersMock, orderStatsMock } from "./mock";
import { queryOrders } from "./query";
import type { OrderQuery, OrdersPage, OrderStat } from "./types";

const MOCK_LATENCY_MS = 300;
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// When the backend exists, replace these two bodies with axios calls.
// Nothing else in the feature changes.
export async function fetchOrders(query: OrderQuery): Promise<OrdersPage> {
  await wait(MOCK_LATENCY_MS);
  return queryOrders(ordersMock, query);
}

export async function fetchOrderStats(): Promise<readonly OrderStat[]> {
  await wait(MOCK_LATENCY_MS);
  return orderStatsMock;
}
