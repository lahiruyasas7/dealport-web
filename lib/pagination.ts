export type PageItem = number | "ellipsis";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/** e.g. page 1 of 24 -> [1, 2, 3, 4, 5, "ellipsis", 24] */
export function getPageItems(
  page: number,
  total: number,
  siblings = 1,
): PageItem[] {
  if (total <= siblings * 2 + 5) return range(1, total);

  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showLeftEllipsis = left > 3;
  const showRightEllipsis = right < total - 2;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + 2 * siblings), "ellipsis", total];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis", ...range(total - (2 + 2 * siblings), total)];
  }
  return [1, "ellipsis", ...range(left, right), "ellipsis", total];
}
