import * as $ from '@radix-ui/react-switch';
import React from 'react';

import type { PropsWithChildren } from 'react';

import { HStack } from '@/components/layouts/HStack';
import { styled } from '@/libs/stitches';

export type SwitchProp = PropsWithChildren<{
	checked?: boolean;
	disabled?: boolean;
	onChange?: (value: boolean) => void;
}>;

export const Switch: React.FC<SwitchProp> = (p) => (
  <HStack as="label" gap="xs" alignItems="center" css={{ cursor: 'pointer', userSelect: 'none' }}>
    <SwitchRoot checked={p.checked} disabled={p.disabled} onCheckedChange={p.onChange}>
      <SwitchThumb />
    </SwitchRoot>
    {p.children}
  </HStack>
);

const SwitchRoot = styled($.Root, {
  all: 'unset',
  width: 48,
  height: 27,
  backgroundColor: '$switchBg',
  borderRadius: '$5',
  border: '1px solid $divider',
  position: 'relative',
  transition: 'all 0.2s $timingFunction$default',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&[data-state="checked"]': {
    borderColor: '$primary',
    backgroundColor: '$switchBgOn',
  },

  '&:focus': {
    borderColor: '$primary',
    boxShadow: '0 0 0 1px $colors$primary',
  },

  '&:hover': {
    borderColor: '$primary',
    border: '1px solid $primary',
  },
});

const SwitchThumb = styled($.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '$switchThumb',
  borderRadius: '$5',
  boxShadow: '$s',
  transition: 'transform 0.2s $timingFunction$default',
  transform: 'translateX(4px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: 'translateX(23px)',
  },
});
