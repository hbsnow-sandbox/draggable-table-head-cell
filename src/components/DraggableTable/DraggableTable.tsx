import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import { classnames } from "tailwindcss-classnames";

export type Props = Readonly<
  {
    rows: { id: string; value: string }[];
    columns: string[][];
  } & Omit<ComponentPropsWithoutRef<"table">, "className">
>;

export const DraggableTable = forwardRef<HTMLTableElement, Props>(
  (props, ref) => {
    const { rows, columns, ...rest } = props;

    return (
      <table ref={ref} {...rest}>
        <thead>
          <tr>
            {rows.map(({ id, value }) => (
              <td
                key={id}
                className={classnames(
                  "border",
                  "border-gray-400",
                  "bg-gray-200",
                  "p-2"
                )}
              >
                {value}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((colmun, i) => (
            <tr key={i}>
              {colmun.map((item, j) => (
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
DraggableTable.displayName = "DraggableTable Component";
