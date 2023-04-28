import { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '@/components/primitives/Spinner';

const meta = {
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
