import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnchorButton, ButtonSizePropertyValues, ButtonVariantPropertyValues } from "./AnchorButton";

const meta = {
  title: "AnchorButton",
  component: AnchorButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ButtonVariantPropertyValues,
    },
    size: {
      control: { type: "select" },
      options: ButtonSizePropertyValues,
    },
    loading: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    loading: false,
    children: "TEST",
  },
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "TEST",
    href: "/",
    iconName: "home",
  },
};
