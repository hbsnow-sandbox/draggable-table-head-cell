import { act, renderHook } from "@testing-library/react-hooks";

import { useOrderedCells } from "./useOrderedCells";

describe(useOrderedCells.name, () => {
  it("should line up in the specified order when changeOrder is executed", () => {
    const { result } = renderHook(() =>
      useOrderedCells(
        [
          { id: "column-1", value: "column 1" },
          { id: "column-2", value: "column 2" },
          { id: "column-3", value: "column 3" },
          { id: "column-4", value: "column 4" },
          { id: "column-5", value: "column 5" },
        ],
        [
          ["1", "2", "3", "4", "5"],
          ["1", "2", "3", "4", "5"],
        ]
      )
    );

    act(() => {
      result.current[1]("column-2", "column-5");
    });

    expect(result.current[0].columns).toEqual([
      { id: "column-1", value: "column 1" },
      { id: "column-5", value: "column 5" },
      { id: "column-3", value: "column 3" },
      { id: "column-4", value: "column 4" },
      { id: "column-2", value: "column 2" },
    ]);
    expect(result.current[0].rows).toEqual([
      ["1", "5", "3", "4", "2"],
      ["1", "5", "3", "4", "2"],
    ]);
  });
});
