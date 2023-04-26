import { styled } from '@/libs/stitches.js';

export const Article = styled('div', {
  width: '100%',
  padding: '$m',
  margin: '0 auto',
  maxWidth: 800,

  variants: {
    wide: {
      true: {
        maxWidth: 1400,
      },
    },
  },
});
