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
