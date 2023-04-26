import { styled, theme } from '@/libs/stitches.js';
import { toVariants } from '@/misc/to-variants.js';

/**
 * シンプルなテキスト表示用コンポーネント。
 */
export const Text = styled('span', {
  variants: {
    fontSize: toVariants(theme.fontSizes, k => ({ fontSize: `$${k} !important` })),
    color: toVariants(theme.colors, k => ({ color: `$${k} !important` })),
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
  },
});
