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
  Create,
  Gallery,
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
            path="/collectibles/:id"
            component={Detail}
          />
          <Route
            path="/gallery"
            component={Gallery}
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
      </Router>
      <Footer />
    </Box>
    </SdkProvider>
  </ChakraProvider>
)
