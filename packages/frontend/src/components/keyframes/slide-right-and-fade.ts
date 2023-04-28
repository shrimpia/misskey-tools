import { keyframes } from '@/libs/stitches';

export const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-4px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});
