import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import {
  ChakraProvider,
  Box,
} from "@chakra-ui/react"
import {
  Account,
  Create,
  Gallery,
  Detail,
  Landing,
  AccountToken,
} from "./pages"
import theme from "./theme"
import { config } from "../config";
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { SdkProvider } from "./services/client/wallet"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SdkProvider config={config}>
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
            <Route component={() => <Redirect to="/gallery" />} />
            <Route
              exact
              path="/"
              component={Landing}
            />
          </Switch>
        </Box>
      </Router>
      <Footer />
    </Box>
    </SdkProvider>
  </ChakraProvider>
)
