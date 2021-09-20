import * as React from "react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Flex,
  HStack,
  Image,
  Link,
  Spinner,
  VStack,
  useColorModeValue,
  useToast,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import {
  CW721,
  formatAddress,
  formatPrice,
  Market,
  NftInfoResponse,
  OfferResponse,
  publicIpfsUrl,
  useSdk,
} from "../../services";
import { config } from "../../../config";
import userLogo from "../../assets/user-default.svg";

interface DetailParams {
    readonly id: string;
}

export const Detail = () => {
    const toast = useToast();
    const { id } = useParams<DetailParams>();
    const { client, address, getSignClient } = useSdk();
    const [nft, setNft] = useState<NftInfoResponse>();
    const [owner, setOwner] = useState<string>();
    const [offer, setOffer] = useState<OfferResponse>();

    useEffect(() => {
      (async () => {
        if (!client) return;

        const contract = CW721(config.contract).use(client);
        const marketContract = Market(config.marketContract).use(client);

        const result = await contract.nftInfo(id);
        result.image = publicIpfsUrl(result.image);
        const offer = await marketContract.offer(config.contract, id);

        setOffer(offer);
        setOwner(offer ? offer.seller : (await contract.ownerOf(id)));
        setNft(result);
      })();
    }, [client, id]);

    const handleBuy = async () => {
      const signClient = getSignClient();
      if (!signClient) {
        toast({
          title: "Account required.",
          description: "Please connect wallet.",
          status: "warning",
          position: "top",
          isClosable: true,
        });

        return;
      }

      if (!offer) return;

      const contract = Market(config.marketContract).useTx(signClient);
      try {
        const txHash = await contract.buy(address, offer.id, offer.list_price);

        alert(txHash);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Unknown error",
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    };

    const loadingSkeleton = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
    return (
      <Box m={5}>
        {!nft ? loadingSkeleton : (
          <Grid minH="80vh"
            gridTemplateColumns={{
              sm: "repeat(1, minmax(0px, 1fr))",
              md: "repeat(8, minmax(0px, 1fr))"
            }}>
            <GridItem colSpan={5}>
              <Flex
                h="full"
                justifyContent="center"
                alignItems="center">
                <Image
                  bgGradient="linear(to-r, green.200, pink.500)"
                  roundedTop="md"
                  boxSize="420px"
                  fit="cover"
                  src={nft.image}
                  alt={nft.name} />
              </Flex>
            </GridItem>
            <GridItem colSpan={3}>
              <Flex>
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
                      @unknown
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
                          color="gray.500"
                        >
                          Owner
                        </chakra.p>
                      </Box>
                      <Box>
                        <HStack>
                          <Avatar size="sm" name="Juno" src={userLogo} />
                          <Link
                            fontSize="md"
                            fontWeight="semibold"
                            _hover={{
                              color: "gray.600",
                            }}
                            as={ReactRouterLink}
                            to={`/account/${owner}`}>{formatAddress(owner!)}</Link>
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
                          color="gray.500"
                        >
                          Price
                        </chakra.p>
                      </Box>
                      <Box>
                        <chakra.p
                          fontWeight="semibold"
                          fontSize="md"
                        >
                          {offer ? formatPrice(offer.list_price) : "Not listed"}
                        </chakra.p>
                      </Box>
                    </VStack>
                  </Box>
                  <Box py={6}
                    borderTop={1}
                    borderStyle={'solid'}
                    borderColor={borderColor}>
                    <Button
                      disabled={!offer}
                      onClick={handleBuy}
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
                      Buy
                    </Button>
                  </Box>
                </VStack>
              </Flex>
            </GridItem>
          </Grid>
      )}
      </Box>
    );
}
