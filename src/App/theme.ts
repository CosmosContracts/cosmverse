import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { mode } from '@chakra-ui/theme-tools';

const config : ThemeConfig = {
   initialColorMode: "light",
   useSystemColorMode: false,
  }

const theme = extendTheme({
  config,
  breakpoins: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  colors: {
    pink: {
      500: '#93ffe9',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflow: 'hidden',
        fontFamily: 'body',
        bg: mode('#9f9f9fff', '#000000ff')(props),
      },
    }),
  },
});

export default theme;
