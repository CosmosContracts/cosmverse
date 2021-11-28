import "./styles/app.sass";

import * as React from "react"

import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  ChakraProvider,
} from "@chakra-ui/react"
import Home from "./screens/Home";
import {
 HomePage,
} from "./pages"
import Page from "./components/Page";
import { SdkProvider } from "./services/client/wallet"
import { config } from "../config";
import theme from "./theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SdkProvider config={config}>

        <Router>
          
          <Route
            exact
            path="/"
            component={HomePage}
          />

          <Route
            exact
            path="/home"
            render={() => (
              <Page>
                <Home />
              </Page>
            )}
          /> 
          </Router>
          

    </SdkProvider>
  </ChakraProvider>
)
