import { Flex } from '@/components/layouts/Flex.js';
import { styled } from '@/libs/stitches.js';

/**
 * 子要素を横に並べて表示するレイアウトコンポーネント。
 */
export const HStack = styled(Flex, {

  flexDirection: 'row',

  defaultVariants: {
    gap: 'm',
  },

  variants: {
    gap: {
      xxs: { gap: '$xxs' },
      xs: { gap: 'x$s' },
      s: { gap: '$s' },
      m: { gap: '$m' },
      l: { gap: '$l' },
      xl: { gap: '$xl' },
      xxl: { gap: '$xxl' },
      xxxl: { gap: '$xxxl' },
    },
  },
});
