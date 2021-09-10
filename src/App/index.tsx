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
  Flex,
  Text,
} from "@chakra-ui/react"
import {
  Account,
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
      <Flex
        py={1}
        justifyContent="center"
        bg="purple.500">
          <Text fontSize="md" color="white">
            ⛓ Juno Testnet
          </Text>
      </Flex>
      <Router>
        <Navbar />
        <Box minH={"lg"}>
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
              path="/account"
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
