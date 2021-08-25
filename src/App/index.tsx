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
  Detail,
  Landing,
} from "./pages"
import theme from "./theme"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

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
      </Grid>
    </Box>
  </ChakraProvider>
)
