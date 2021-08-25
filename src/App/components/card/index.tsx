import {
    Box,
    chakra,
    Divider,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import * as React from "react";
import { NftInfo } from "../../services/type";

interface NftCardProps {
    readonly nft: NftInfo;
}

export function NftCard({ nft }: NftCardProps): JSX.Element {
    return (
        <Flex
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box mx="auto">
            <Image
                roundedTop="lg"
                h={52}
                w="full"
                fit="cover"
                src={nft.image}
                alt={nft.title}
            />
            <Box px={4} bg="gray.900" roundedBottom="md">
                <Box py={2}>
                    <chakra.p
                        mt={1}
                        fontSize="xs"
                        color="gray.500"
                    >
                        @{nft.user}
                    </chakra.p>
                    <chakra.h1
                        color={"white"}
                        fontWeight="bold"
                        fontSize="2xl"
                    >
                        {nft.title}
                    </chakra.h1>
                    <chakra.p
                        mt={1}
                        fontSize="xs"
                        color="white"
                    >
                        #15 in edition of 32
                    </chakra.p>
                </Box>
                <Divider />
                <Box
                    py={4}
                    color="white"
                >
                    <Text fontSize="xs">
                        Price
                    </Text>
                    <chakra.h1 fontWeight="semibold" fontSize="sm">
                        {nft.price}
                    </chakra.h1>
                </Box>
            </Box>  
          </Box>
        </Flex>
      );
}