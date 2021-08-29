import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import {
  ChakraProvider,
  Box,
} from "@chakra-ui/react"
import {
  Create,
  Collectibles,
  Detail,
  Landing,
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
        <Switch>
          <Route
            exact
            path="/"
            component={Landing}
          />
          <Route
            exact
            path="/collectibles/:id"
            component={Detail}
          />
          <Route
            exact
            path="/collectibles"
            component={Collectibles}
          />
          <Route
            path="/create"
            component={Create}
          />
        </Switch>
      </Router>
      <Footer />
    </Box>
    </SdkProvider>
  </ChakraProvider>
)
