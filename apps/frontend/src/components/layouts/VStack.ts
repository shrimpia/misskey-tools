import {Flex} from '@/components/layouts/Flex.js';
import {styled} from '@/libs/stitches.js';

export const VStack = styled(Flex, {
  flexDirection: 'column',
  variants: {
    gap: {
      xxs: { gap: '$xxs' },
      xs: { gap: '$xs' },
      s: { gap: '$s' },
      m: { gap: '$m' },
      l: { gap: '$l' },
      xl: { gap: '$xl' },
      xxl: { gap: '$xxl' },
      xxxl: { gap: '$xxxl' },
    },
  },
});


