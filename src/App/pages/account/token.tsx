import * as React from "react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Select,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  GridItem,
  useDisclosure,
  useToast,
  useBoolean,
  Grid,
} from "@chakra-ui/react";
import {
  CW721,
  NftInfoResponse,
  publicIpfsUrl,
  formatAddress,
  formatPrice,
  Market,
  OfferResponse,
  toMinDenom,
  useSdk,
} from "../../services";
import { TransactionLink } from "../../components";
import { config } from "../../../config";
import userLogo from "../../assets/user-default.svg";

interface DetailParams {
    readonly id: string;
}

export const AccountToken = () => {
    const { id } = useParams<DetailParams>();
    const { client, address, getSignClient } = useSdk();
    const [nft, setNft] = useState<NftInfoResponse>();
    const [owner, setOwner] = useState<string>();
    const [offer, setOffer] = useState<OfferResponse>();
    const [loading, setLoading] = useBoolean();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [amount, setAmount] = useState<number>();
    const [denom, setDenom] = useState<string>();

    const loadData = useCallback(async () => {
      if (!client) return;

      const contract = CW721(config.contract).use(client);
      const marketContract = Market(config.marketContract).use(client);

      const result = await contract.nftInfo(id);
      result.image = publicIpfsUrl(result.image);
      const offer = await marketContract.offer(config.contract, id);

      setOffer(offer);
      setOwner(offer ? offer.seller : (await contract.ownerOf(id)));
      setNft(result);
    }, [client, id]);

    useEffect(() => {
      loadData();
    }, [loadData]);

    const handleSell = async () => {
      const signClient = getSignClient();
      if (!signClient) {
        toast({
          title: "Account required.",
          description: "Please, connect wallet.",
          status: "warning",
          position: "top",
          isClosable: true,
        });

        return;
      }

      if (!amount || !denom) return;
      onClose();
      setLoading.on();

      try {
        const contract = CW721(config.contract).useTx(signClient);
        const price = { list_price: {amount: toMinDenom(amount, denom), denom}};
        const txHash = await contract.send(address, config.marketContract, price, id);

        toast({
          title: `Successful Transaction`,
          description: (<TransactionLink tx={txHash} />),
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
        await loadData();
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
      finally {
        setLoading.off();
      }
    };

    const handleWithdraw = async () => {
      const signClient = getSignClient();
      if (!signClient) {
        toast({
          title: "Account required.",
          description: "Please, connect wallet.",
          status: "warning",
          position: "top",
          isClosable: true,
        });

        return;
      }

      if (!offer) return;
      setLoading.on();

      try {
        const contract = Market(config.marketContract).useTx(signClient);
        const txHash = await contract.withdraw(address, offer.id);

        toast({
          title: `Successful Transaction`,
          description: (<TransactionLink tx={txHash} />),
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
        await loadData();
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
      finally {
        setLoading.off();
      }
    };

    const loadingSkeleton = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
    const priceModal = (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create sell order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontFamily="mono" fontWeight="semibold">Price</FormLabel>
            <SimpleGrid columns={6} spacing={3}>
            <FormControl as={GridItem} colSpan={[6, 4]}>
              <NumberInput
                defaultValue={1.00}
                onChange={(_, value) => setAmount(value)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 2]}>
              <Select placeholder="Select coin" onChange={e => setDenom(e.target.value)}>
                <option value="ujuno">JUNO</option>
                <option value="usponge">SPONGE</option>
              </Select>
            </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSell} colorScheme="pink" mr={3}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
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
                    {offer ? (
                      <Button
                        isLoading={loading}
                        onClick={handleWithdraw}
                        title="Withdraw NFT"
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
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        isLoading={loading}
                        onClick={onOpen}
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
                    )}
                  </Box>
                </VStack>
              </Flex>
            </GridItem>
          </Grid>
      )}
      {priceModal}
      </Box>
    );
}
