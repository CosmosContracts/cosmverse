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

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Router>
          <div>
            <ul>
              <li>
                <Link as={ReactRouterLink} to="/">Home</Link>
              </li>
              <li>
                <Link as={ReactRouterLink} to="/collectibles">Collectibles</Link>
              </li>
              <li>
                <Link as={ReactRouterLink} to="/create">Create</Link>
              </li>
            </ul>

            <hr />

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
          </div>
        </Router>
      </Grid>
    </Box>
  </ChakraProvider>
)
