import { styled } from '@/libs/stitches.js';

export const Button = styled('button', {
  display: 'flex',
  border: 'none',
  borderRadius: '$m',
  fontWeight: 'bold',
  backgroundColor: '$buttonBg',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  cursor: 'pointer',

  '&:active': {
    backgroundColor: '$buttonBgActive',
  },

  defaultVariants: {
    size: 'medium',
    radius: 1,
  },

  variants: {
    primary: {
      true: {
        backgroundColor: '$buttonBgPrimary',
        color: '$primaryFg',

        '&:active': {
          backgroundColor: '$buttonBgPrimaryActive',
        },
      },
    },
    primaryGradient: {
      true: {
        background: 'linear-gradient(to right, $buttonBgPrimaryGradientA, $buttonBgPrimaryGradientB)',
        color: '$primaryFg',

        '&:active': {
          background: '$buttonBgPrimaryActive',
        },
      },
    },
    flat: {
      true: {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '$flatHover',
        },
        '&:active': {
          backgroundColor: '$flatActive',
        },
      },
    },
    size: {
      small: {
        padding: '$xxs $s',
        fontSize: '$xs',
      },
      medium: {
        padding: '$xs $m',
      },
      large: {
        padding: '$s $l',
        fontSize: '$l',
      },
    },
    radius: {
      1: { borderRadius: '$1' },
      2: { borderRadius: '$2' },
      3: { borderRadius: '$3' },
      4: { borderRadius: '$4' },
      5: { borderRadius: '$5' },
    },
  },
});
