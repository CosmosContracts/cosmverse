import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({

  fonts: {
    body: "mono",
  },
  colors: {
    pink: {
      500: "#eb3089",
    },
  },
})

export default theme