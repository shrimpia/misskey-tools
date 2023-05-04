import type { Meta, StoryObj } from '@storybook/react';

import { HeaderBar } from '@/components/HeaderBar.js';

const meta = {
  component: HeaderBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderBar>;

export default meta;
type Story = StoryObj<typeof HeaderBar>;

export const Default: Story = { };
