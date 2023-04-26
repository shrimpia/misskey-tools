import { StoryObj, Meta } from '@storybook/react';

import {Button} from '@/components/primitives/Button.js';

const meta = {
  title: 'Components/Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'ボタンだよ',
    primary: false,
    primaryGradient: false,
    flat: false,
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    radius: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Flat: Story = {
  args: {
    flat: true,
  },
};

export const Radius1: Story = {
  args: {
    radius: 1,
  },
};

export const Radius2: Story = {
  args: {
    radius: 2,
  },
};

export const Radius3: Story = {
  args: {
    radius: 3,
  },
};

export const Radius4: Story = {
  args: {
    radius: 4,
  },
};

export const Radius5: Story = {
  args: {
    radius: 5,
  },
};
