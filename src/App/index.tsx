import * as React from "react"

import {
 Dashboard,
 HomePage
} from "./pages"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  ChakraProvider,
} from "@chakra-ui/react"
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

          <Route
            exact
            path="/"
            component={Dashboard}
          />
            
          </Router>
    </SdkProvider>
  </ChakraProvider>
)
