import {extendTheme, ThemeConfig} from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  } as ThemeConfig,
  fonts: {
    body: '"Koruri", sans-serif',
    heading: '"Koruri", sans-serif',
  },
  colors: {
    misskey: {
      lighten: 'rgb(172,230,0)',
      normal: 'rgb(134,179,0)',
      darken: 'rgb(96,128,0)',
    },
  },
});
