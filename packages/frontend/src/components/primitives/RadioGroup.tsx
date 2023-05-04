import * as $ from '@radix-ui/react-radio-group';
import React from 'react';

import { VStack } from '../layouts/VStack';

import type { PropsWithChildren } from 'react';

export type RadioGroupProp = PropsWithChildren<{
	value?: string;
	onValueChange?: (value: string) => void;
}>;

export const RadioGroup: React.FC<RadioGroupProp> = (p) => (
  <$.Root value={p.value} onValueChange={p.onValueChange}>
    <VStack gap="xs">
      {p.children}
    </VStack>
  </$.Root>
);
