import React from "react";

import { NextPage } from "next";
import { classnames } from "tailwindcss-classnames";

import { DraggableTable } from "../components/DraggableTable";

const data = {
  rows: [
    { id: "row-1", value: "row 1" },
    { id: "row-2", value: "row 2" },
    { id: "row-3", value: "row 3" },
    { id: "row-4", value: "row 4" },
    { id: "row-5", value: "row 5" },
  ],
  columns: [
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
    ["1", "2", "3", "4", "5"],
  ],
};

const Page: NextPage = () => {
  return (
    <main className={classnames("p-4")}>
      <DraggableTable {...data} />
    </main>
  );
};

export default Page;
