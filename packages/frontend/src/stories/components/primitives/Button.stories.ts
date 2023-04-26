import { StoryObj, Meta } from '@storybook/react';

import { Button } from '@/components/primitives/Button.js';

const meta = {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    primary: false,
    primaryGradient: false,
    flat: false,
    disabled: false,
    danger: false,
    size: 'medium',
    radius: 'medium',
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    radius: {
      options: ['small', 'medium', 'large', 'pill'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const PrimaryGradient: Story = {
  args: {
    primaryGradient: true,
  },
};

export const Danger: Story = {
  args: {
    danger: true,
  },
};

export const Flat: Story = {
  args: {
    flat: true,
  },
};

export const RadiusSmall: Story = {
  args: {
    radius: 'small',
  },
};

export const RadiusMedium: Story = {
  args: {
    radius: 'medium',
  },
};

export const RadiusLarge: Story = {
  args: {
    radius: 'large',
  },
};

export const RadiusPill: Story = {
  args: {
    radius: 'pill',
  },
};
