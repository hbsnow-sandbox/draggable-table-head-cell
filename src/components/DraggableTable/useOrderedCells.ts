import { useCallback, useState } from "react";

import { Props } from ".";
import { swap } from "../../utils/swap";
import { DnDState } from "./useDnD";

export const useOrderedCells = (
  rows: Props["rows"],
  columns: Props["columns"]
) => {
  const [orderedRows, setOrderedRows] = useState(rows);
  const [orderedColumns, setOrderedColumns] = useState(columns);

  const changeOrder = useCallback(
    (dndState: DnDState) => {
      if (
        dndState.droppedId === undefined ||
        dndState.draggedId === dndState.droppedId
      ) {
        return;
      }
      const fromIndex = rows.findIndex(({ id }) => id === dndState.draggedId);
      const toIndex = rows.findIndex(({ id }) => id === dndState.droppedId);

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

  return [{ orderedRows, orderedColumns }, changeOrder] as const;
};
