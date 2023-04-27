import * as $ from '@radix-ui/react-radio-group';
import React, { PropsWithChildren } from 'react';

import { VStack } from '../layouts/VStack';

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
