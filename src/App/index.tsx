import * as React from "react"
import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
  Switch,
  Route,
} from "react-router-dom"
import {
  ChakraProvider,
  Box,
  Link,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { 
  Create,
  Collectibles,
  Landing,
} from "./pages"
import { Navbar } from "./components/navbar"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Navbar />
      <Grid minH="100vh" p={3}>
        <Router>
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
