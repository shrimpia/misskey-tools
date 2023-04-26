import { Meta, StoryObj } from '@storybook/react';
import { errorCodes } from 'tools-shared/dist/types/error-code.js';

import { BackendError } from '@/components/domains/backend-error/BackendError.js';


const meta = {
  component: BackendError,
  tags: ['autodocs'],
  argTypes: {
    error: {
      options: errorCodes,
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BackendError>;

export default meta;
type Story = StoryObj<typeof BackendError>;

export const Default: Story = { };
