import { Flex } from '@/components/layouts/Flex.js';
import { styled } from '@/libs/stitches.js';

export const HStack = styled(Flex, {
  flexDirection: 'row',
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
