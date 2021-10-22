import * as React from "react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import {
  formatPrice,
  NftInfo,
  CW721,
  Market,
  NftInfoResponse,
  publicIpfsUrl,
  useSdk,
  CW721Instance,
} from "../../services";
import { config } from "../../../config";
import { NftCard } from "../../components";
import userLogo from "../../assets/user-default.svg";

interface AccountParams {
  readonly user: string;
}

const maxItemsPerPage = 15;

export const Account = () => {
  const { user } = useParams<AccountParams>();

  const { client, address } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);
  const [nftSale, setNftSale] = useState<NftInfo[]>([]);

  const getNftsInfo = async (ids: string[], contract: CW721Instance) => {
    const allNfts: Promise<NftInfoResponse>[] = [];
    ids.forEach(tokenId => {
      allNfts.push(contract.nftInfo(tokenId));
    });

    const tokens = await Promise.all(allNfts);
    return tokens.map((nft, idx) => {
      return {
        tokenId: ids[idx],
        user: 'unknown',
        title: nft.name,
        price: 'Not listed',
        image: publicIpfsUrl(nft.image),
        total: 1
      };
    });
  };

  useEffect(() => {
    (async () => {
      if (!client || !user) return;

      const contract = CW721(config.contract).use(client);
      const result = await contract.tokens(user, undefined, maxItemsPerPage);
      setNfts(await getNftsInfo(result.tokens, contract));
    })();
  }, [client, user]);

  useEffect(() => {
    (async () => {
      if (!client || !user) return;

      const contract = CW721(config.contract).use(client);
      const marketcw = Market(config.marketContract).use(client);
      const result = await marketcw.offersBySeller(user, undefined, maxItemsPerPage);
      const tokens = await getNftsInfo(result.offers.map(o => o.token_id), contract);

      const items = tokens.map((nft, idx) => {
        const off = result.offers[idx];
        nft.price = formatPrice(off.list_price);
        return nft;
      });
      setNftSale(items);
    })();
  }, [client, user]);

  const getNftPath = (nftId: string) => `${address === user ? "/account" : ""}/token/${nftId}`;

  return (
    <Box m={5}>
      <VStack
        spacing={10}
        align="stretch"
      >
        <Flex justifyContent={"center"}>
          <VStack spacing={4}>
            <Box>
              <Image
                borderRadius="full"
                boxSize="120px"
                src={userLogo} />
            </Box>
            <Box bg="gray.500" borderRadius="xl" py={1} px={3}>
              <Text
                color={"white"}
                fontFamily="mono"
                fontSize="sm">
                {user}
              </Text>
            </Box>
          </VStack>
        </Flex>
        <Box>
          <Tabs
            isManual
            isLazy
            defaultIndex={1}
            colorScheme="cyan">
            <TabList>
              <Tab>On Sale</Tab>
              <Tab>Owned</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SimpleGrid spacing={10} gridTemplateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))", "repeat(5, minmax(0px, 1fr))"]}>
                  {nftSale.map(nft => (
                    <LinkBox as="picture" key={nft.tokenId}
                      transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
                      _hover={{
                        transform: "scale(1.05)"
                      }}>
                      <LinkOverlay as={ReactRouterLink} to={getNftPath(nft.tokenId)}>
                        <NftCard nft={nft} />
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid spacing={10} gridTemplateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))", "repeat(5, minmax(0px, 1fr))"]}>
                  {nfts.map(nft => (
                    <LinkBox as="picture" key={nft.tokenId}
                      transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
                      _hover={{
                        transform: "scale(1.05)"
                      }}>
                      <LinkOverlay as={ReactRouterLink} to={getNftPath(nft.tokenId)}>
                        <NftCard nft={nft} />
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  );
};