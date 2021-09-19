import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import * as React from "react";
import { NftCard } from "../nft-card";
import { randomNft } from "../nft-card/rand";

interface NftSectionProps {
  readonly title: string;
}

export function NftSection({ title }: NftSectionProps): JSX.Element {

  return (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        py={4}
      >
        <Text
          fontSize="lg"
          fontWeight="600">
          {title}
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
      <Grid templateColumns="repeat(5, 1fr)" gap={10}>
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
      </Grid>
    </Box>
  );
}
