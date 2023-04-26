import { styled } from '@/libs/stitches.js';

/**
 * Flex Box コンポーネント
 */
export const Flex = styled('div', {
  display: 'flex',
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
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
