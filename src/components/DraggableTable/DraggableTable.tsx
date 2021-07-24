import React, {
  ComponentPropsWithoutRef,
  DragEventHandler,
  forwardRef,
  useEffect,
  useMemo,
} from "react";

import throttle from "lodash.throttle";
import { classnames } from "tailwindcss-classnames";

import { useDnD } from "./useDnD";
import { useOrderedCells } from "./useOrderedCells";

export type Props = Readonly<
  {
    rows: { id: string; value: string }[];
    columns: string[][];
  } & Omit<ComponentPropsWithoutRef<"table">, "className">
>;

export const DraggableTable = forwardRef<HTMLTableElement, Props>(
  (props, ref) => {
    const { rows, columns, ...rest } = props;

    const [ordered, changeOrder] = useOrderedCells(rows, columns);

    const [dndState, dnd] = useDnD();

    const handleDragOver = useMemo(() => {
      return throttle<DragEventHandler<HTMLDivElement>>((e) => {
        // preventDefault しなければ、drop イベントが発火しない
        e.preventDefault();

        if (!(e.target instanceof HTMLDivElement)) {
          return;
        }
        const { id } = e.target.dataset;

        if (id) {
          changeOrder(dndState.draggedId, dndState.hoveredId);
          dnd.dragEnter(id);
        }
      }, 300);
    }, [changeOrder, dnd, dndState]);

    const handleDragEnd: DragEventHandler<HTMLDivElement> = () => {
      dnd.dragEnd();
    };

    useEffect(() => {
      return () => {
        handleDragOver.cancel();
      };
    }, [handleDragOver]);

    return (
      <table ref={ref} {...rest}>
        <thead>
          <tr>
            {ordered.rows.map(({ id, value }) => (
              <td
                key={id}
                className={classnames(
                  "border",
                  "border-gray-400",
                  "bg-gray-200"
                )}
              >
                <div
                  draggable
                  onDragStart={() => dnd.dragStart(id)}
                  onDragOver={handleDragOver}
                  onDragLeave={() => dnd.dragLeave()}
                  onDrop={() => dnd.drop(id)}
                  onDragEnd={handleDragEnd}
                  className={classnames("p-2", {
                    ["bg-blue-200"]: dndState.draggedId === id,
                    ["bg-red-200"]: dndState.hoveredId === id,
                  })}
                  data-id={id}
                >
                  {value}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {ordered.columns.map((column, i) => (
            <tr key={i}>
              {column.map((item, j) => (
                <td
                  key={j}
                  className={classnames("border", "border-gray-400", "p-2")}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
DraggableTable.displayName = "DraggableTable";
