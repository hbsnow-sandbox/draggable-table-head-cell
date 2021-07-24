import { act, renderHook } from "@testing-library/react-hooks";

import { useDnD } from "./useDnD";

describe(useDnD.name, () => {
  it("should return undefined as initial value", () => {
    const { result } = renderHook(() => useDnD());

    expect(result.current[0].draggedId).toBeUndefined();
    expect(result.current[0].hoveredId).toBeUndefined();
    expect(result.current[0].droppedId).toBeUndefined();
  });

  it("should be the id specified by draggedId when dragStart is executed", () => {
    const { result } = renderHook(() => useDnD());

    act(() => {
      result.current[1].dragStart("start");
    });

    expect(result.current[0].draggedId).toBe("start");
    expect(result.current[0].hoveredId).toBeUndefined();
    expect(result.current[0].droppedId).toBeUndefined();
  });

  it("should be the id specified by hoveredId when dragEnter is executed", () => {
    const { result } = renderHook(() => useDnD());

    act(() => {
      result.current[1].dragEnter("enter");
    });

    expect(result.current[0].draggedId).toBeUndefined();
    expect(result.current[0].hoveredId).toBe("enter");
    expect(result.current[0].droppedId).toBeUndefined();
  });

  it("should have a draggedId of undefined when it executes dragStart", () => {
    const { result } = renderHook(() =>
      useDnD({
        draggedId: undefined,
        hoveredId: "enter",
        droppedId: undefined,
      })
    );

    act(() => {
      result.current[1].dragLeave();
    });

    expect(result.current[0].draggedId).toBeUndefined();
    expect(result.current[0].hoveredId).toBeUndefined();
    expect(result.current[0].droppedId).toBeUndefined();
  });

  it("should be the id specified by droppedId when drop is executed", () => {
    const { result } = renderHook(() => useDnD());

    act(() => {
      result.current[1].drop("drop");
    });

    expect(result.current[0].draggedId).toBeUndefined();
    expect(result.current[0].hoveredId).toBeUndefined();
    expect(result.current[0].droppedId).toBe("drop");
  });

  it("should all be undefined when dragEnd is executed", () => {
    const { result } = renderHook(() =>
      useDnD({
        draggedId: "drag",
        hoveredId: "enter",
        droppedId: "drop",
      })
    );

    act(() => {
      result.current[1].dragEnd();
    });

    expect(result.current[0].draggedId).toBeUndefined();
    expect(result.current[0].hoveredId).toBeUndefined();
    expect(result.current[0].droppedId).toBeUndefined();
  });
});
