import { styled } from '@/libs/stitches.js';

export const Flex = styled('div', {
  display: 'flex',
  variants: {
    alignItems: {
      left: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      right: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justifyContent: {
      left: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      right: { justifyContent: 'flex-end' },
      stretch: { justifyContent: 'stretch' },
    },
  },
});
