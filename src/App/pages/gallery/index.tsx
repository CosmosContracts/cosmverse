import * as React from "react"
import {
  Box, SimpleGrid,
} from "@chakra-ui/react"
import { NftCard } from "../../components/nft-card";
import { randomNft } from "../../components/nft-card/rand";

export const Gallery = () => {
  return (
    <Box m={5}>
      <SimpleGrid columns={5} spacing={10}>
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
        <NftCard nft={randomNft()} />
      </SimpleGrid>
    </Box>
  );
};
