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
  color: 'inherit',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  cursor: 'pointer',
  lineHeight: 1.5,
  textDecoration: 'none',

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
    inline: {
      true: {
        display: 'inline',
      },
    },
    size: {
      small: {
        padding: '$2xs $s',
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

  compoundVariants: [
    {
      primary: true,
      flat: true,
      css: {
        color: '$primary',
        borderColor: 'transparent',
        background: 'transparent',
        '&:not(:disabled):hover': {
          background: '$flatHover',
          borderColor: 'transparent',
        },
        '&:not(:disabled):active': {
          background: '$flatActive',
          borderColor: 'transparent',
        },
      },
    },
    {
      danger: true,
      flat: true,
      css: {
        color: '$danger',
        borderColor: 'transparent',
        background: 'transparent',
        '&:not(:disabled):hover': {
          background: '$flatHover',
          borderColor: 'transparent',
        },
        '&:not(:disabled):active': {
          background: '$flatActive',
          borderColor: 'transparent',
        },
      },
    },
  ],
});
