import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Card } from "./Card";

const meta = {
  title: "Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    post: {
      id: "hoge",
      content: "アイコンボタンを作るときに最低44px x 44pxが推奨されている",
    },
    user: {
      id: "hogehoge",
      name: "fugafuga",
      avatarUrl: "https://ui-avatars.com/api/?name=Koya+Iwabuchi&background=random",
    },
  },
};
