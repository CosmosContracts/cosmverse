import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import {
  ChakraProvider,
  Box,
  Grid,
} from "@chakra-ui/react"
import { 
  Create,
  Collectibles,
  Landing,
} from "./pages"
import theme from "./theme"
import { Navbar } from "./components/navbar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <Router>
        <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={Landing}
            />
            <Route
              path="/collectibles"
              component={Collectibles}
            />
            <Route
              path="/create"
              component={Create}
            />
          </Switch>
        </Router>
      </Grid>
    </Box>
  </ChakraProvider>
)
