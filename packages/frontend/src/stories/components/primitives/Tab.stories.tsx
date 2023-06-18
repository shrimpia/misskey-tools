import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tab, TabItem } from '@/components/primitives/Tab';

const meta = {
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    layouts: 'centered',
  },
  args: {
    children: ([
      <TabItem key="home" value="home">ホーム</TabItem>,
      <TabItem key="notification" value="notification">通知</TabItem>,
      <TabItem key="explore" value="explore">みつける</TabItem>,
    ]),
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
};

