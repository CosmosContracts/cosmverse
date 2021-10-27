import * as React from "react"

import {
  Account,
  AccountToken,
  Create,
  Detail,
  Gallery,
  Landing,
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
    <Router>

      <Route component={() => <Redirect to="/" />} />
      <Route
        exact
        path="/"
        component={HomePage}
      />

  </Router>

  {/*   <SdkProvider config={config}>
    <Box>
      <Router>
        <Navbar />
        <Box minH={"lg"}>
          <Switch>
            <Route
              exact
              path="/token/:id"
              component={Detail}
            />
            <Route
              path="/gallery"
              component={Gallery}
            />
            <Route
              exact
              path="/account/token/:id"
              component={AccountToken}
            />
            <Route
              path="/account/:user"
              component={Account}
            />
            <Route
              path="/create"
              component={Create}
            />
            <Route component={() => <Redirect to="/" />} />
            <Route
              exact
              path="/"
              component={HomePage}
            />
          </Switch>
        </Box>
      </Router>
      <Footer />
    </Box>
    </SdkProvider> */}
  </ChakraProvider>
)
