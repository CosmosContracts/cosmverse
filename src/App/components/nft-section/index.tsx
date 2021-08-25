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
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
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
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80",
      title: "NIKE Air",
      user: "Mistic",
      price: price + " JUNO",
    };
  }

  return {
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
    title: "Pen cosm",
    user: "RealMint",
    price: price + " JUNO",
  };
}
