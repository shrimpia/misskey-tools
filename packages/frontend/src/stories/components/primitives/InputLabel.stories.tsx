import { Meta } from '@storybook/react';
import React from 'react';

import { Input } from '@/components/primitives/Input.js';
import { InputLabel } from '@/components/primitives/InputLabel.js';

const meta = {
  component: InputLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof InputLabel>;

export default meta;

export const Default = () => (
  <InputLabel>
		名前
    <Input placeholder="名前を入力してください" />
  </InputLabel>
);

