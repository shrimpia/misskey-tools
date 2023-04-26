import { styled } from '@/libs/stitches.js';

export const Input = styled('input', {
  padding: '$xs $m',
  borderRadius: '$2',
  background: '$card',
  color: '$fg',
  fontSize: '$m',
  border: '1px solid $divider',
  transition: 'all 0.2s ease',

  '&:focus': {
    borderColor: '$primary',
    boxShadow: '0 0 0 1px $colors$primary',
  },

  variants: {
    error: {
      true: {
        color: '$danger',
        borderColor: '$danger',
        '&:focus': {
          borderColor: '$danger',
          boxShadow: '0 0 0 1px $colors$danger',
        },
      },
    },
  },
});
