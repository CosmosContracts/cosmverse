import * as React from "react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams} from "react-router-dom";
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
  formatAddress,
  formatPrice,
  NftInfo,
  CW721,
  Market,
  NftInfoResponse,
  publicIpfsUrl,
  useSdk,
} from "../../services";
import { config } from "../../../config";
import { NftCard } from "../../components";
import userLogo from "../../assets/user-default.svg";

interface AccountParams {
  readonly user: string;
}

export const Account = () => {
  const { user } = useParams<AccountParams>();

  const { client, address } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);
  const [nftSale, setNftSale] = useState<NftInfo[]>([]);

  useEffect(() => {
    (async () => {
      if (!client || !user) return;

      const contract = CW721(config.contract).use(client);
      const result = await contract.tokens(user, undefined, 10);

      const allNfts: Promise<NftInfoResponse>[] = [];
      result.tokens.forEach(tokenId => {
        allNfts.push(contract.nftInfo(tokenId));
      });

      const tokens = await Promise.all(allNfts);
      const items = tokens.map((nft, idx) => {
        return {
          tokenId: result.tokens[idx],
          user: 'unknown',
          title: nft.name,
          price: 'Not listed',
          image: publicIpfsUrl(nft.image),
          total: 1
        };
      });
      setNfts(items);
    })();
  }, [client, user]);

  useEffect(() => {
    (async () => {
      if (!client || !user) return;

      const contract = CW721(config.contract).use(client);
      const marketcw = Market(config.marketContract).use(client);
      const result = await marketcw.offersBySeller(user);

      const allNfts: Promise<NftInfoResponse>[] = [];
      result.offers.forEach(off => {
        allNfts.push(contract.nftInfo(off.token_id));
      });

      const tokens = await Promise.all(allNfts);
      const items = tokens.map((nft, idx) => {
        const off = result.offers[idx];
        return {
          tokenId: off.token_id,
          user: 'unknown',
          title: nft.name,
          price: formatPrice(off.list_price),
          image: publicIpfsUrl(nft.image),
          total: 1
        };
      });
      setNftSale(items);
    })();
  }, [client, user]);

  const getNftPath = (nftId: string) => `${address === user ? "/account": ""}/token/${nftId}`;

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
					<Box bg="blackAlpha.300" borderRadius="xl" py={1} px={3}>
						<Text color={"gray.500"} fontFamily="mono" fontSize="sm">
							{ user ? formatAddress(user) : '...' }
						</Text>
					</Box>
					</VStack>
				</Flex>
				<Box>
					<Tabs>
						<TabList>
							<Tab>Owned</Tab>
							<Tab>On Sale</Tab>
						</TabList>

						<TabPanels>
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
						</TabPanels>
					</Tabs>
				</Box>
      </VStack>
		</Box>
	);
};
