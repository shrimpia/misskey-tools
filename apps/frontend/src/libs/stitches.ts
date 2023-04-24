import { olive } from '@radix-ui/colors';
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
      card: olive.olive1,
      cardPale: olive.olive3,
      primary: 'rgb(134,179,0)',
      primaryLighten: 'rgb(172,230,0)',
      primaryDarken: 'rgb(96,128,0)',
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
      1: '10px',
      2: '12px',
      3: '14px',
      4: '16px',
      5: '18px',
      6: '20px',
      7: '24px',
      8: '32px',
      9: '48px',
      10: '96px',
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
