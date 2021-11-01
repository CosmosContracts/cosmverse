import * as React from "react"

import {
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  ChakraProvider,
} from "@chakra-ui/react"
import {
 HomePage,
} from "./pages"
import { SdkProvider } from "./services/client/wallet"
import { config } from "../config";
import theme from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SdkProvider config={config}>

        <Router>
          <Route component={() => <Redirect to="/" />} />
          <Route
            exact
            path="/"
            component={HomePage}
          />
          </Router>
    </SdkProvider>
  </ChakraProvider>
)
