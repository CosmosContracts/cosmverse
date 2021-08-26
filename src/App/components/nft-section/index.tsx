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
import { NftInfo } from "../../services/type";
import { NftCard } from "../nft-card";

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

function randomNft(): NftInfo {
  const price = (Math.random() * 10).toFixed(1);
  const rand = Math.floor((Math.random() * 100) % 2);

  if (rand === 1) {
    return {
      image: "https://rmrk.mypinata.cloud/ipfs/bafybeih3g3e4nlg45osboov64z6wb2m3wyh5fud7dswfs7yhyrysemxcsu",
      title: "Punk D4",
      user: "Mistic",
      price: price + " JUNO",
    };
  }

  return {
    image: "https://rmrk.mypinata.cloud/ipfs/bafybeicpgysjduvvfvpdhe2zqn2hh2dzdcxyracwtn5foak6i5v7rjxiry",
    title: "Break OU",
    user: "RealMint",
    price: price + " JUNO",
  };
}
