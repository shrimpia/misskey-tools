import { Meta, StoryObj } from '@storybook/react';

import { LoginButton } from '@/components/domains/welcome/LoginButton.js';

const meta = {
  component: LoginButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Default: Story = { };
