import * as React from "react";
import { Link as ReactRouterLink} from "react-router-dom";
import {
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { NftCard } from "../nft-card";
import { NftInfo } from "../../services";

interface NftTableProps {
  readonly data: NftInfo[];
}

export function NftTable({ data }: NftTableProps): JSX.Element {
  return (
    <SimpleGrid spacing={{base: 5, md: 10}} gridTemplateColumns={["repeat(1, minmax(0px, 1fr))", "repeat(3, minmax(0px, 1fr))", "repeat(5, minmax(0px, 1fr))"]}>
      {data.map(nft => (
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
  );
}
