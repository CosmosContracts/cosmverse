import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link as ReactRouterLink} from "react-router-dom";
import {
  Box,
  Center,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { NftCard, Pagination } from "../../components";
import {
  CW721,
  formatPrice,
  NftInfoResponse,
  Market,
  NftInfo,
  publicIpfsUrl,
  OfferResponse,
  useSdk,
} from "../../services";
import { config } from "../../../config";

const pageSize = 15;

export const Gallery = () => {
  const { client } = useSdk();
  const [nfts, setNfts] = useState<NftInfo[]>([]);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [pages, setPages] = useState<(string|undefined)[]>([undefined]);

  const loadNfts = useCallback(async (page: number) => {
    if (!client) return;

    const start = pages[page-1];
    const contract = CW721(config.contract).use(client);
    const marketcw = Market(config.marketContract).use(client);
    const result = await contract.allTokens(start, pageSize);
    const numTokens = await contract.numTokens();

    const allNfts: Promise<NftInfoResponse>[] = [];
    const allOffers: Promise<OfferResponse|undefined>[] = [];
    result.tokens.forEach(tokenId => {
      allNfts.push(contract.nftInfo(tokenId));
      allOffers.push(marketcw.offer(config.contract, tokenId));
    });

    const tokens = await Promise.all(allNfts);
    const offers = await Promise.all(allOffers);
    const items = tokens.map((nft, idx) => {
      const off = offers[idx];
      return {
        tokenId: result.tokens[idx],
        user: 'unknown',
        title: nft.name,
        price: off ? formatPrice(off.list_price): "Not listed",
        image: publicIpfsUrl(nft.image),
        total: 1
      };
    });

    if (page >= pages.length) {
      const lastTokenId = result.tokens[result.tokens.length - 1];
      pages.push(lastTokenId);
      setPages(pages);
    }

    setPages(pages);
    setNfts(items);
    setTotalTokens(numTokens);
  }, [client, pages]);

  useEffect(() => {
    loadNfts(1);
  }, [loadNfts]);

  const handlePage = async (page: number) => {
    await loadNfts(page);
  };

  const loadingSkeleton = (
    <Center>
      <Spinner size="xl" />
    </Center>
  );

  const bodyContent = (
    <>
      <SimpleGrid spacing={10} gridTemplateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))", "repeat(5, minmax(0px, 1fr))"]}>
        {nfts.map(nft => (
          <LinkBox as="picture" key={nft.tokenId}
            transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
            _hover={{
              transform: "scale(1.05)"
            }}>
            <LinkOverlay as={ReactRouterLink} to={`/token/${nft.tokenId}`}>
              <NftCard nft={nft} />
            </LinkOverlay>
          </LinkBox>
        ))}
      </SimpleGrid>
      <Pagination onChangePage={handlePage} total={totalTokens} step={pageSize} />
    </>
  )

  return (
    <Box m={5}>
      {nfts.length === 0 ? loadingSkeleton : bodyContent}
    </Box>
  );
};
