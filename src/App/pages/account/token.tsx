import * as React from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Image,
  Spinner,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import { useSdk } from "../../services/client/wallet";
import { useEffect, useState } from "react";
import { CW721, NftInfoResponse } from "../../services/client/cw721";
import { config } from "../../../config";
import { publicIpfsUrl } from "../../services/ipfs/client";
import userLogo from "../../assets/user-default.svg";
import { formatAddress } from "../../services/utils";

interface DetailParams {
    readonly id: string;
}

export const AccountToken = () => {
    const { id } = useParams<DetailParams>();
    const { client } = useSdk();
    const [nft, setNft] = useState<NftInfoResponse>();
    const [owner, setOwner] = useState<string>();

    useEffect(() => {
      (async () => {
        if (!client) return;

        const contract = CW721(config.contract).use(client);
        const result = await contract.nftInfo(id);

        result.image = publicIpfsUrl(result.image);
        setNft(result);

        const nftOwner = await contract.ownerOf(id);
        setOwner(nftOwner);
      })();
    }, [client, id]);

    const loadingSkeleton = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
    return (
      <Box m={5}>
        {!nft ? loadingSkeleton : (
          <Wrap>
            <WrapItem>
              <Flex w="800px" h="80vh" justifyContent="center" alignItems="center">
                <Image
                  bgGradient="linear(to-r, green.200, pink.500)"
                  roundedTop="md"
                  boxSize="420px"
                  fit="cover"
                  src={nft.image}
                  alt={nft.name} />
              </Flex>
            </WrapItem>
            <WrapItem>
              <Flex h="80vh">
                <VStack spacing={6} align="stretch">
                <Box py={2}>
                  <chakra.h1
                    fontWeight="bold"
                    fontSize="3xl"
                  >
                    {nft.name}
                  </chakra.h1>
                  <chakra.p
                    mt={1}
                    fontSize="xs"
                    color="gray.500"
                  >
                    @unknow
                  </chakra.p>
                  <chakra.p
                    mt={1}
                    maxW="400px"
                    fontSize="md"
                  >
                    {nft.description}
                  </chakra.p>
                </Box>
                <Box>
                  <VStack spacing={2} align="stretch">
                    <Box>
                      <chakra.p
                        fontFamily="mono"
                        fontSize="md"
                      >
                        Owner
                      </chakra.p>
                    </Box>
                    <Box>
                    <HStack>
                      <Avatar size="sm" name="Juno" src={userLogo} />
                      <chakra.p
                        fontSize="md"
                        color="gray.500"
                      >
                        {owner ? formatAddress(owner): "..."}
                      </chakra.p>
                    </HStack>
                    </Box>
                  </VStack>
                </Box>
                <Box>
                  <VStack spacing={2} align="stretch">
                    <Box>
                      <chakra.p
                        fontFamily="mono"
                        fontSize="md"
                      >
                        Price
                      </chakra.p>
                    </Box>
                    <Box>
                      <chakra.p
                          fontSize="md"
                          color="gray.500"
                        >
                          Not listed
                        </chakra.p>
                    </Box>
                  </VStack>
                </Box>
                <Box py={6}
                        borderTop={1}
                        borderStyle={'solid'}
                        borderColor={borderColor}>
                  <Button
                    disabled
                    type="button"
                    height="var(--chakra-sizes-10)"
                    fontSize={'md'}
                    fontWeight="semibold"
                    borderRadius={'50px'}
                    color={'white'}
                    bg="pink.500"
                    _hover={{
                      bg: "pink.700",
                    }}>
                    Sell
                  </Button>
                </Box>
                </VStack>
              </Flex>
            </WrapItem>
          </Wrap>
      )}
      </Box>
    );
}
