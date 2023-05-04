import type { StoryObj, Meta } from '@storybook/react';

import { Text } from '@/components/primitives/Text.js';

const meta = {
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    fontSize: {
      options: [
        'xxs',
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
        'xxxl',
        'xxxxl',
        'xxxxxl',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy 4って鳴く dog.',
    fontSize: 'm',
  },
};
