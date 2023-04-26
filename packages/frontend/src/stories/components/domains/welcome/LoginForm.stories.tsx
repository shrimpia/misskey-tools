import { Meta, StoryObj } from '@storybook/react';

import { LoginForm } from '@/components/domains/welcome/LoginForm.js';

const meta = {
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = { };
