import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button, ButtonSizePropertyValues, ButtonVariantPropertyValues } from "./Button";
import { iconNameValue } from "../icons/UseIcon";

const meta = {
  title: "Button",
  component: Button,
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
    startIconName: {
      control: { type: "select" },
      options: iconNameValue,
    },
    endIconName: {
      control: { type: "select" },
      options: iconNameValue,
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    loading: false,
    wide: false,
    children: "TEST",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "TEST",
    loading: false,
    variant: "primary",
    size: "medium",
    wide: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "TEST",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "TEST",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "TEST",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "TEST",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "TEST",
  },
};
export const Loading: Story = {
  args: {
    loading: true,
    children: "TEST",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "TEST",
  },
};
