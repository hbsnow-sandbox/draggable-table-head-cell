import React from "react";

import { NextPage } from "next";
import { classnames } from "tailwindcss-classnames";

import { DraggableTable } from "../components/DraggableTable";

const data = {
  columns: [
    { id: "column-1", value: "column 1" },
    { id: "column-2", value: "column 2" },
    { id: "column-3", value: "column 3" },
    { id: "column-4", value: "column 4" },
    { id: "column-5", value: "column 5" },
  ],
  rows: [
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
