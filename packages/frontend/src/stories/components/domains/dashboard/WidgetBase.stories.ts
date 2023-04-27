import { Meta, StoryObj } from '@storybook/react';

import { WidgetBase } from '@/components/domains/dashboard/WidgetBase';

const meta = {
  component: WidgetBase,
  tags: ['autodocs'],
  args: {
    title: 'Lorem Ipsum',
    iconClass: 'ti ti-antenna',
    pale: false,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WidgetBase>;

export default meta;
type Story = StoryObj<typeof WidgetBase>;

export const Default: Story = { };
