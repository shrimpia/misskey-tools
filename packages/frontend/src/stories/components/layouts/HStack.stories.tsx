import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { HStack } from '@/components/layouts/HStack.js';
import { styled } from '@/libs/stitches.js';

const Box = styled('div', {
  borderRadius: '$3',
  background: '$primary',
  width: 64,
  height: 64,
});

const meta = {
  component: HStack,
  tags: ['autodocs'],
  args: {
    gap: 'm',
    children: (
      <>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
      </>
    ),
  },
  argTypes: {
    gap: { control: 'select', options: [undefined, '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] },
    alignItems: { control: 'select', options: [undefined, 'left', 'right', 'center', 'stretch'] },
    justifyContent: { control: 'select', options: [undefined, 'left', 'right', 'center', 'stretch'] },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HStack>;

export default meta;
type Story = StoryObj<typeof HStack>;

export const Default: Story = { };
