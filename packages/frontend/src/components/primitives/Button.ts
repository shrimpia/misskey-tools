import { styled } from '@/libs/stitches.js';

/**
 * ユーザーからの入力を受け付けるボタン。
 */
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
    radius: 'medium',
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
      small: { borderRadius: '$1' },
      medium: { borderRadius: '$2' },
      large: { borderRadius: '$3' },
      pill: { borderRadius: '$5' },
    },
  },
});
