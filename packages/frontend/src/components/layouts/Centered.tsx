import { styled } from '@/libs/stitches.js';

/**
 * 子要素を中央に揃えて表示するコンポーネント。
 */
export const Centered = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    fullscreen: {
      true: {
        width: '100vw',
        height: '100vh',
      },
    },
  },
});
