import { useCallback, useState } from "react";

import { Props } from ".";
import { swap } from "../../utils/swap";

export const useOrderedCells = (
  rows: Props["rows"],
  columns: Props["columns"]
) => {
  const [orderedRows, setOrderedRows] = useState(rows);
  const [orderedColumns, setOrderedColumns] = useState(columns);

  const changeOrder = useCallback(
    (fromId: string | undefined, toId: string | undefined) => {
      if (fromId === undefined || toId === undefined || fromId === toId) {
        return;
      }
      const fromIndex = rows.findIndex(({ id }) => id === fromId);
      const toIndex = rows.findIndex(({ id }) => id === toId);

      // rows を desiredSort の順に並び替える
      const resultRows = swap(rows, fromIndex, toIndex);

      // columns の中の配列を desiredSort の順に並び替える
      const resultColumns = columns.map((column) =>
        swap(column, fromIndex, toIndex)
      );

      setOrderedRows(resultRows);
      setOrderedColumns(resultColumns);
    },
    [columns, rows]
  );

  return [{ rows: orderedRows, columns: orderedColumns }, changeOrder] as const;
};
