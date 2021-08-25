import * as React from "react"
import {
  Text,
  Box,
  Grid,
  StackDivider,
  VStack,
} from "@chakra-ui/react"
import { NftSection } from "../../components/nft-section"

export const Landing = () => {
  return (
    <Grid m={5} minH="100vh">
      <Box mt={5} mb={8}>
        <Text
          fontFamily="mono"
          fontSize="lg"
          fontWeight="600">
          Welcome to Cosmverse, NFTs on JUNO.
        </Text>
      </Box>

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <NftSection title="Curated work" />
        <Box h="240px" bg="tomato">
          2
        </Box>
        <Box h="240px" bg="pink.100">
          3
        </Box>
      </VStack>
    </Grid>
  );
}
