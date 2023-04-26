import { StoryObj, Meta } from '@storybook/react';

import { Input } from '@/components/primitives/Input.js';

const meta = {
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '値を入力…',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
  },
};

