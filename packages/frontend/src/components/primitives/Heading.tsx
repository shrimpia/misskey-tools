import { styled, theme } from '@/libs/stitches.js';
import { toVariants } from '@/misc/to-variants.js';

/**
 * 見出し表示
 */
export const Heading = styled('div', {
  fontSize: '$3xl',
  marginBottom: '$s',

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

/**
 * 小見出し表示
 */
export const SubHeading = styled('div', {
  fontSize: '$xl',
  margin: '$l 0 $s 0',

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
