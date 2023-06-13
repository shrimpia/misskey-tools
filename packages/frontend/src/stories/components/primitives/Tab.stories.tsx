import React from 'react';

import type { Meta } from '@storybook/react';

import { Tab, TabItem } from '@/components/primitives/Tab';

const meta = {
  component: Tab,
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof Tab>;

export default meta;

export const Default = () => (
  <Tab>
    <TabItem value="home">ホーム</TabItem>
    <TabItem value="notification">通知</TabItem>
    <TabItem value="explore">みつける</TabItem>
  </Tab>
);
