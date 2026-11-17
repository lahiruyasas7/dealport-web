import { useCallback, useMemo, useState } from "react";

export function useRowSelection(visibleIds: readonly string[]) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  // Only rows on the current page count as "selected" for the UI.
  const selectedVisible = useMemo(
    () => new Set(visibleIds.filter((id) => selected.has(id))),
    [visibleIds, selected],
  );
  const allSelected =
    visibleIds.length > 0 && selectedVisible.size === visibleIds.length;
  const someSelected = selectedVisible.size > 0 && !allSelected;

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of visibleIds) {
        if (allSelected) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }, [visibleIds, allSelected]);

  return {
    selected: selectedVisible,
    allSelected,
    someSelected,
    toggle,
    toggleAll,
  };
}
