
import { styled } from '@/libs/stitches';

export const PageRoot = styled('main', {
  width: '100%',
  padding: '$xl',
  margin: '0 auto',
  marginTop: '$2xl',
  maxWidth: 1400,

  '@phone': {
    padding: '$s',
  },
});
