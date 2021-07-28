import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import { DraggableTable, Props } from ".";

export default {
  title: "components/DraggableTable",
  component: DraggableTable,
} as Meta;

const Template: Story<Props> = (args) => <DraggableTable {...args} />;

export const Default = Template.bind({});
Default.args = {
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
