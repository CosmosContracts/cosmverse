import * as React from "react"
import {
  Text,
  Box,
  Grid,
  StackDivider,
  VStack,
  Flex,
  Button,
  useColorModeValue
} from "@chakra-ui/react"
import { NftCard } from "../../components/card"
import { NftInfo } from "../../services/type"
import { ChevronRightIcon } from "@chakra-ui/icons"

export const Landing = () => {
  const nft : NftInfo = {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
    title: "NIKE Air",
    user: "Mistic",
    price: "5 JUNO",
  };
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
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={4}
          >
            <Text
              fontSize="lg"
              fontWeight="600">
              Curated work
            </Text>
            <Button p={0}
              rightIcon={<ChevronRightIcon />}
              color={useColorModeValue("gray.800", "white")}
              variant="link"
              fontSize="sm"
              fontFamily="mono"
              fontWeight="semibold">
                View all
            </Button>
          </Flex>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <NftCard nft={nft}/>
            <NftCard nft={nft}/>
            <NftCard nft={nft}/>
            <NftCard nft={nft}/>
            <NftCard nft={nft}/>
          </Grid>
        </Box>
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
