import type { StoryObj, Meta } from '@storybook/react';

import { Switch } from '@/components/primitives/Switch';

const meta = {
  component: Switch,
  tags: ['autodocs'],
  args: {
    children: 'スイッチ',
    disabled: false,
  },
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const Off: Story = {
  args: {
    checked: false,
  },
};
export const On: Story = {
  args: {
    checked: true,
  },
};
