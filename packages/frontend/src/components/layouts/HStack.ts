import { Flex } from '@/components/layouts/Flex.js';
import { styled, theme } from '@/libs/stitches.js';
import { toVariants } from '@/misc/to-variants.js';

/**
 * 子要素を横に並べて表示するレイアウトコンポーネント。
 */
export const HStack = styled(Flex, {
  flexDirection: 'row',

  defaultVariants: {
    gap: 'm',
  },

  variants: {
    gap: toVariants(theme.space, s => ({ gap: '$' + s })),
  },
});
