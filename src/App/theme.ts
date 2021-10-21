import { extendTheme, useColorModeValue } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"


const theme = extendTheme({
  // fonts: {
  //   body: "mono",
  // },
  colors: {
    pink: {
      500: "#93ffe9",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        bg:  mode ("white.200", "cyan.900")(props),
      },
    }),
  },
})

export default theme
