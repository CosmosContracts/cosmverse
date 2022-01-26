import "./styles/app.sass";

import * as React from "react"

import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import Home from "./screens/Home";
import {
 HomePage,
} from "./pages"
import Page from "./components/Page";
import { SdkProvider } from "./services/client/wallet"
import { config } from "../config";

export const App = () => (
  
    <SdkProvider config={config}>

        <Router>
        <ChakraProvider theme={theme}>
          <Route
            exact
            path="/"
            component={HomePage}
          />
        </ChakraProvider>
          <Route
            exact
            path="/home"
            render={() => (
              <Page>
                <Home />
              </Page>
            )}
          /> 

          <Route
            exact
            path="/dashboard"
            render={() => (
              <Page>
               
              </Page>
            )}
          /> 
          <Route
            exact
            path="/auction"
            render={() => (
              <Page>
                  
              </Page>
            )}
          /> 
          <Route
            exact
            path="/data"
            render={() => (
              <Page>
              </Page>
            )}
          /> 
          <Route
            exact
            path="/profile/:id"
            render={() => (
              <Page>
              </Page>
            )}
          /> 

          </Router>
          

    </SdkProvider>

)