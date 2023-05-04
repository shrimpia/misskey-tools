import React from 'react';

import type { Meta } from '@storybook/react';

import { Radio } from '@/components/primitives/Radio';
import { RadioGroup } from '@/components/primitives/RadioGroup';

const meta = {
  component: RadioGroup,
  parameters: {
    layouts: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Default = () => (
  <RadioGroup>
    <Radio value="A">コウテイペンギン</Radio>
    <Radio value="B">アデリーペンギン</Radio>
    <Radio value="C">ジェンツーペンギン</Radio>
  </RadioGroup>
);
