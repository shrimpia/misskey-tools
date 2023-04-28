import { keyframes } from '@/libs/stitches';

export const scaleOut = keyframes({
  '0%': {
    transform: 'scale(0)',
    opacity: 1,
  },
  '90%': {
    transform: 'scale(1.0)',
    opacity: 0,
  },
});
