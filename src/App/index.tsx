import * as React from "react"

import {
  Account,
  AccountToken,
  Create,
  Detail,
  Gallery,
  HomePage,
} from "./pages"
import {
  Box,
  ChakraProvider,
} from "@chakra-ui/react"
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom"

import { Footer } from "./components/footer"
import { Navbar } from "./components/navbar"
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
