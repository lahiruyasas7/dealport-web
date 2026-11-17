import { DEFAULT_ORDER_FILTERS as D } from "./constants";
import { ORDER_SORT_KEYS, ORDER_TABS, SORT_DIRECTIONS } from "./types";
import type { OrderFilters } from "./types";

const isOneOf = <T extends string>(
  values: readonly T[],
  v: string | null,
): v is T => v !== null && (values as readonly string[]).includes(v);

export function parseOrderFilters(
  params: Pick<URLSearchParams, "get">,
): OrderFilters {
  const tab = params.get("tab");
  const sortKey = params.get("sort");
  const sortDir = params.get("dir");
  const page = Number.parseInt(params.get("page") ?? "", 10);

  return {
    tab: isOneOf(ORDER_TABS, tab) ? tab : D.tab,
    search: params.get("q") ?? D.search,
    sortKey: isOneOf(ORDER_SORT_KEYS, sortKey) ? sortKey : D.sortKey,
    sortDir: isOneOf(SORT_DIRECTIONS, sortDir) ? sortDir : D.sortDir,
    page: Number.isInteger(page) && page > 0 ? page : D.page,
  };
}

/** Defaults are omitted so URLs stay clean. */
export function serializeOrderFilters(f: OrderFilters): string {
  const params = new URLSearchParams();
  if (f.tab !== D.tab) params.set("tab", f.tab);
  if (f.search) params.set("q", f.search);
  if (f.sortKey !== D.sortKey) params.set("sort", f.sortKey);
  if (f.sortDir !== D.sortDir) params.set("dir", f.sortDir);
  if (f.page !== D.page) params.set("page", String(f.page));
  return params.toString();
}
