import * as $ from '@radix-ui/react-radio-group';
import React from 'react';

import type { PropsWithChildren } from 'react';

import { styled } from '@/libs/stitches';


const RadioGroupItem = styled($.Item, {
  all: 'unset',
  backgroundColor: 'transparent',
  width: '1.25em',
  height: '1.25em',
  borderRadius: '$5',
  border: '2px solid $divider',
  '[data-state=checked]': {
    borderColor: '$primary',
  },
});

const RadioGroupIndicator = styled($.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 11,
    height: 11,
    borderRadius: '50%',
    backgroundColor: '$primary',
  },
});

const Label = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
  padding: '$xs',
  background: '$card',
  cursor: 'pointer',
  border: '1px solid $divider',
  borderRadius: '$2',
  transition: 'all 0.2s $timingFunction$default',

  '&:hover': {
    borderColor: '$primary',
  },
  '&:focus-within': {
    borderColor: '$primary',
    boxShadow: '0 0 0 1px $colors$primary',
  },
});

export type RadioProp = PropsWithChildren<{
	value: string;
}>;

export const Radio: React.FC<RadioProp> = (p) => {
  return (
    <Label>
      <RadioGroupItem value={p.value}>
        <RadioGroupIndicator />
      </RadioGroupItem>
      {p.children}
    </Label>
  );
};
