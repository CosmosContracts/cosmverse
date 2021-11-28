import "./styles/app.sass";

import * as React from "react"

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
import theme from "./theme"

export const App = () => (
  
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
