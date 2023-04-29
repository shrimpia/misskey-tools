import { StoryObj, Meta } from '@storybook/react';
import React from 'react';

import { Badge } from '@/components/primitives/Badge';

const meta = {
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'NEW',
  },
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText = () => (
  <div>Lorem Ipsum <Badge>NEW</Badge></div>
);
