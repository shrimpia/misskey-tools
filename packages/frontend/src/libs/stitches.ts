import { blackA, olive, oliveDark, tomato, tomatoDark, whiteA } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg: olive.olive5,
      fg: olive.olive12,
      white: olive.olive1,
      black: olive.olive12,
      muted: olive.olive11,
      card: olive.olive1,
      cardPale: olive.olive4,
      divider: olive.olive8,
      primary: 'rgb(134,179,0)',
      primaryLighten: 'rgb(172,230,0)',
      primaryDarken: 'rgb(96,128,0)',
      primaryFg: '$white',
      danger: tomato.tomato10,
      dangerLighten: tomato.tomato8,
      buttonBg: olive.olive1,
      buttonBgDisabled: olive.olive8,
      buttonFgDisabled: olive.olive10,
      buttonBgActive: olive.olive6,
      buttonBgPrimary: '$primary',
      buttonBgPrimaryActive: '$primaryDarken',
      buttonBgPrimaryGradientA: 'rgb(134,179,0)',
      buttonBgPrimaryGradientB: 'rgb(74,179,0)',
      buttonBgDanger: '$danger',
      buttonBgDangerActive: tomato.tomato11,
      headerBarBg: blackA.blackA10,
      headerBarTitleFg: whiteA.whiteA10,
      headerBarFg: olive.olive1,
      flatHover: blackA.blackA3,
      flatActive: blackA.blackA4,
    },
    space: {
      '2xs': '4px',
      xs: '8px',
      s: '12px',
      m: '16px',
      l: '24px',
      xl: '48px',
      '2xl': '64px',
      '3xl': '96px',
    },
    fontSizes: {
      '2xs': '10px',
      xs: '12px',
      s: '14px',
      m: '16px',
      l: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px',
      '5xl': '64px',
      '6xl': '72px',
      '7xl': '96px',
    },
    radii: {
      1: '3px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '999px',
    },
    zIndices: {
      base: 0,
      floating: 2,
      modal: 10,
      popup: 15,
    },
  },
  media: {
    phone: '(max-width: 640px)',
    pad: '(max-width: 768px)',
    pc: '(max-width: 1024px)',
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    bg: oliveDark.olive2,
    fg: oliveDark.olive12,
    white: oliveDark.olive1,
    black: oliveDark.olive12,
    muted: oliveDark.olive11,
    divider: oliveDark.olive8,
    card: oliveDark.olive5,
    cardPale: oliveDark.olive1,
    danger: tomatoDark.tomato10,
    dangerLighten: tomatoDark.tomato8,
    buttonBg: oliveDark.olive1,
    buttonBgDisabled: oliveDark.olive8,
    buttonFgDisabled: oliveDark.olive10,
    buttonDisabledFg: oliveDark.olive8,
    buttonBgActive: oliveDark.olive2,
    flatHover: whiteA.whiteA6,
    flatActive: whiteA.whiteA5,
  },
});

export const globalStyles = globalCss({
  body: {
    background: '$bg',
    color: '$fg',
    fontFamily: '"Koruri", sans-serif',
  },
  a: {
    color: '$primary',
  },
});
