import {styled, theme} from '@/libs/stitches.js';
import {toVariants} from '@/misc/to-variants.js';

export const Text = styled('span', {
  variants: {
    fontSize: toVariants(theme.fontSizes, k => ({fontSize: `$${k} !important`})),
  },
});