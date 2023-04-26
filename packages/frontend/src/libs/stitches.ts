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
      bg: olive.olive4,
      fg: olive.olive12,
      white: olive.olive1,
      black: olive.olive12,
      muted: olive.olive11,
      card: olive.olive1,
      cardPale: olive.olive3,
      primary: 'rgb(134,179,0)',
      primaryLighten: 'rgb(172,230,0)',
      primaryDarken: 'rgb(96,128,0)',
      primaryFg: '$white',
      danger: tomato.tomato10,
      dangerLighten: tomato.tomato8,
      buttonBg: olive.olive1,
      buttonBgActive: olive.olive6,
      buttonBgPrimary: '$primary',
      buttonBgPrimaryActive: '$primaryDarken',
      buttonBgPrimaryGradientA: 'rgb(134,179,0)',
      buttonBgPrimaryGradientB: 'rgb(74,179,0)',
      flatHover: blackA.blackA3,
      flatActive: blackA.blackA5,
    },
    space: {
      xxs: '4px',
      xs: '8px',
      s: '12px',
      m: '16px',
      l: '24px',
      xl: '48px',
      xxl: '64px',
      xxxl: '96px',
    },
    fontSizes: {
      xxs: '10px',
      xs: '12px',
      s: '14px',
      m: '16px',
      l: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
      xxxxl: '48px',
      xxxxxl: '96px',
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
    phone: '(min-width: 640px)',
    pad: '(min-width: 768px)',
    pc: '(min-width: 1024px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    bg: oliveDark.olive4,
    fg: oliveDark.olive12,
    white: oliveDark.olive1,
    black: oliveDark.olive12,
    muted: oliveDark.olive11,
    card: oliveDark.olive1,
    cardPale: oliveDark.olive3,
    danger: tomatoDark.tomato10,
    dangerLighten: tomatoDark.tomato8,
    buttonBg: oliveDark.olive1,
    buttonBgActive: oliveDark.olive2,
    flatHover: whiteA.whiteA6,
    flatActive: whiteA.whiteA9,
  },
});

export const globalStyles = globalCss({
  body: {
    background: '$bg',
    color: '$fg',
  },
});
