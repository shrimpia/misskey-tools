import { keyframes } from '@/libs/stitches';

export const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-4px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});
