import * as React from "react";
import {
  Box, SimpleGrid,
} from "@chakra-ui/react";
import { NftCard } from "../../components/nft-card";
import { useSdk } from "../../services/client/wallet";
import { CW721, NftInfoResponse } from "../../services/client/cw721";
import { config } from "../../../config";
import { useEffect } from "react";
import { publicIpfsUrl } from "../../services/ipfs/client";
import { useState } from "react";
import { NftInfo } from "../../services/type";


export const Gallery = () => {
  const { client } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);

  useEffect(() => {
    (async () => {
      if (!client) return;

      const contract = CW721(config.contract).use(client);
      const result = await contract.allTokens(undefined, 10);

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
          edition: 1,
          total: 1
        };
      });
      setNfts(items);
    })();
  }, [client]);

  return (
    <Box m={5} minH={"lg"}>
      <SimpleGrid columns={5} spacing={10}>
        {nfts.map(nft => <NftCard nft={nft} key={nft.tokenId} />)}
      </SimpleGrid>
    </Box>
  );
};
