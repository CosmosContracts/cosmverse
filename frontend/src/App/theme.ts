import { extendTheme } from '@chakra-ui/react';

// const config : ThemeConfig = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// }

const theme = extendTheme({
  // fonts: {
  //   body: "mono",
  // },
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
      },
    }),
  },
});

export default theme;