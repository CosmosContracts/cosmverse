import * as React from "react";
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
import { Link as ReactRouterLink} from "react-router-dom";
import { useSdk } from "../../services/client/wallet";
import { formatAddress, formatPrice } from "../../services/utils";
import { useEffect, useState } from "react";
import { NftInfo } from "../../services/type";
import { CW721, NftInfoResponse } from "../../services/client/cw721";
import { config } from "../../../config";
import { publicIpfsUrl } from "../../services/ipfs/client";
import { NftCard } from "../../components/nft-card";
import userLogo from "../../assets/user-default.svg";
import { Market } from "../../services/client/market";

export const Account = () => {
  const { address } = useSdk();
  const { client } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);
  const [nftSale, setNftSale] = useState<NftInfo[]>([]);

  useEffect(() => {
    (async () => {
      if (!client || !address) return;

      const contract = CW721(config.contract).use(client);
      const result = await contract.tokens(address, undefined, 10);

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
  }, [client, address]);

  useEffect(() => {
    (async () => {
      if (!client || !address) return;

      const contract = CW721(config.contract).use(client);
      const marketcw = Market(config.marketContract).use(client);
      const result = await marketcw.offersBySeller(address);

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
  }, [client, address]);

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
							{ address ? formatAddress(address) : '...' }
						</Text>
					</Box>
					</VStack>
				</Flex>
				<Box>
					<Tabs>
						<TabList>
							<Tab>Owned</Tab>
							<Tab>On Sale</Tab>
							<Tab>Created</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
                <SimpleGrid columns={5} spacing={10}>
                  {nfts.map(nft => (
                    <LinkBox as="picture" key={nft.tokenId}>
                      <LinkOverlay as={ReactRouterLink} to={`/account/token/${nft.tokenId}`}>
                        <NftCard nft={nft} />
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </SimpleGrid>
							</TabPanel>
              <TabPanel>
                <SimpleGrid columns={5} spacing={10}>
                    {nftSale.map(nft => (
                      <LinkBox as="picture" key={nft.tokenId}>
                        <LinkOverlay as={ReactRouterLink} to={`/account/token/${nft.tokenId}`}>
                          <NftCard nft={nft} />
                        </LinkOverlay>
                      </LinkBox>
                    ))}
                  </SimpleGrid>
							</TabPanel>
							<TabPanel>
								<p>In progress...</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
      </VStack>
		</Box>
	);
};
