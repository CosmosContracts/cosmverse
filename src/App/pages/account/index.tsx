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
} from "@chakra-ui/react";
import { useSdk } from "../../services/client/wallet";
import { formatAddress } from "../../services/utils";
import { useEffect, useState } from "react";
import { NftInfo } from "../../services/type";
import { CW721, NftInfoResponse } from "../../services/client/cw721";
import { config } from "../../../config";
import { publicIpfsUrl } from "../../services/ipfs/client";
import { NftCard } from "../../components/nft-card";


export const Account = () => {
  const { address } = useSdk();
  const { client } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);

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
          user: 'unknow',
          title: nft.name,
          price: 'Not listed',
          image: publicIpfsUrl(nft.image),
          total: 1
        };
      });
      setNfts(items);
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
							src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI0NiwyNDYsMjQ2LDEpOyc+PGcgc3R5bGU9J2ZpbGw6cmdiYSgyMDQsMzgsMjE3LDEpOyBzdHJva2U6cmdiYSgyMDQsMzgsMjE3LDEpOyBzdHJva2Utd2lkdGg6MC42Oyc+PHJlY3QgIHg9JzU1JyB5PSczNScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzU1JyB5PSc0NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzU1JyB5PSc1NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzU1JyB5PSc2NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzQ1JyB5PSc1NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzY1JyB5PSc1NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzQ1JyB5PSc3NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzY1JyB5PSc3NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzM1JyB5PSc0NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9Jzc1JyB5PSc0NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9JzM1JyB5PSc1NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PHJlY3QgIHg9Jzc1JyB5PSc1NScgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJy8+PC9nPjwvc3ZnPg==" />
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
							<Tab>Created</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
                <SimpleGrid columns={5} spacing={10}>
                  {nfts.map(nft => <NftCard nft={nft} key={nft.tokenId} />)}
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
