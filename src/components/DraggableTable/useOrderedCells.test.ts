import { act, renderHook } from "@testing-library/react-hooks";

import { useOrderedCells } from "./useOrderedCells";

describe(useOrderedCells.name, () => {
  it("should line up in the specified order when changeOrder is executed", () => {
    const { result } = renderHook(() =>
      useOrderedCells(
        [
          { id: "row-1", value: "row 1" },
          { id: "row-2", value: "row 2" },
          { id: "row-3", value: "row 3" },
          { id: "row-4", value: "row 4" },
          { id: "row-5", value: "row 5" },
        ],
        [
          ["1", "2", "3", "4", "5"],
          ["1", "2", "3", "4", "5"],
        ]
      )
    );

    act(() => {
      result.current[1]({
        draggedId: "row-2",
        hoveredId: "row-2",
        droppedId: "row-5",
      });
    });

    expect(result.current[0].orderedRows).toEqual([
      { id: "row-1", value: "row 1" },
      { id: "row-5", value: "row 5" },
      { id: "row-3", value: "row 3" },
      { id: "row-4", value: "row 4" },
      { id: "row-2", value: "row 2" },
    ]);
    expect(result.current[0].orderedColumns).toEqual([
      ["1", "5", "3", "4", "2"],
      ["1", "5", "3", "4", "2"],
    ]);
  });
});
