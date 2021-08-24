import * as React from "react"
import {
  Text,
  Link,
  VStack,
  Code,
} from "@chakra-ui/react"

export const Landing = () => (
  <VStack spacing={8} height='540px'>
    <Text>
      Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
    </Text>
    <Link
      color="teal.500"
      href="https://chakra-ui.com"
      fontSize="2xl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Chakra
    </Link>
  </VStack>
)
