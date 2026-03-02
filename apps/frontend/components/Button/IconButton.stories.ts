import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IconButton, ButtonSizePropertyValues } from "./IconButton";
import { iconNameValue } from "../icons/UseIcon";

const meta = {
  title: "IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ButtonSizePropertyValues,
    },
    loading: {
      control: { type: "boolean" },
    },
    iconName: {
      control: { type: "select" },
      options: iconNameValue,
    },
  },
  args: {
    size: "medium",
    loading: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    size: "medium",
    iconName: "ellipsisHorizontal",
    title: "もっと見る",
    ariaLabel: "もっと見る",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    iconName: "ellipsisHorizontal",
    title: "もっと見る",
    ariaLabel: "もっと見る",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    iconName: "ellipsisHorizontal",
    title: "もっと見る",
    ariaLabel: "もっと見る",
  },
};
