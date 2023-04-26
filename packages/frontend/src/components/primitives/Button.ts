import { styled } from '@/libs/stitches.js';

export const Button = styled('button', {
  display: 'flex',
  border: '1px solid $buttonBg',
  borderRadius: '$m',
  fontWeight: 'bold',
  background: '$buttonBg',
  color: '$fg',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
    background: '$buttonBgDisabled',
    color: '$buttonFgDisabled',
    borderColor: '$buttonBgDisabled',
  },

  '&:not(:disabled):active': {
    background: '$buttonBgActive',
  },

  defaultVariants: {
    size: 'medium',
    radius: 1,
  },

  variants: {
    primary: {
      true: {
        background: '$buttonBgPrimary',
        color: '$primaryFg',
        borderColor: '$buttonBgPrimary',

        '&:not(:disabled):active': {
          background: '$buttonBgPrimaryActive',
          borderColor: '$buttonBgPrimaryActive',
        },
      },
    },
    danger: {
      true: {
        background: '$buttonBgDanger',
        color: '$primaryFg',
        borderColor: '$buttonBgDanger',

        '&:not(:disabled):active': {
          background: '$buttonBgDangerActive',
          borderColor: '$buttonBgDangerActive',
        },
      },
    },
    primaryGradient: {
      true: {
        background: 'linear-gradient(to right, $buttonBgPrimaryGradientA, $buttonBgPrimaryGradientB)',
        borderColor: '$buttonBgPrimary',
        color: '$primaryFg',

        '&:not(:disabled):active': {
          background: '$buttonBgPrimaryActive',
          borderColor: '$buttonBgPrimaryActive',
        },
      },
    },
    flat: {
      true: {
        background: 'transparent',
        borderColor: 'transparent',
        '&:disabled': {
          background: 'transparent',
          color: '$buttonFgDisabled',
          borderColor: 'transparent',
        },
        '&:not(:disabled):hover': {
          background: '$flatHover',
        },
        '&:not(:disabled):active': {
          background: '$flatActive',
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
