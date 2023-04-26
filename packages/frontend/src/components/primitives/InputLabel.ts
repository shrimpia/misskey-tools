import * as Label from '@radix-ui/react-label';

import { styled } from '@/libs/stitches.js';

/**
 * Input コンポーネントを修飾するためのコンポーネント。
 */
export const InputLabel = styled(Label.Root, {
  display: 'flex',
  fontSize: '$s',
  flexDirection: 'column',
  gap: '$xxs',
});
