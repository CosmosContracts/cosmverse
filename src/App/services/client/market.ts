import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/stargate";

export interface OfferResponse {
  contract: string
  id: string
  list_price: Coin
  seller: string,
  token_id: string
}

export interface OffersResponse {
  offers: OfferResponse[]
}

export interface MarketInstance {
  readonly contractAddress: string;

  numOffers: () => Promise<number>;
  offer: (contract: string, tokenId: string) => Promise<OfferResponse|undefined>;
  offersBySeller: (seller: string, startAfter?: string, limit?: number) => Promise<OffersResponse>;
  allOffers: (startAfter?: string, limit?: number) => Promise<OffersResponse>;
}

export interface MarketTxInstance {
  readonly contractAddress: string;

  // actions
  buy: (sender: string, offerId: string, price: Coin) => Promise<string>;
  withdraw: (sender: string, offerId: string) => Promise<string>;
}

export interface MarketContract {
  use: (client: CosmWasmClient) => MarketInstance;
  useTx: (client: SigningCosmWasmClient) => MarketTxInstance;
}

export const Market = (contractAddress: string): MarketContract => {
  const use = (client: CosmWasmClient): MarketInstance => {

    const numOffers = async (): Promise<number> => {
      const result = await client.queryContractSmart(contractAddress, { get_count: {} });
      return result.count;
    };

    const offer = async (contract: string, tokenId: string): Promise<OfferResponse|undefined> => {
      const result: OffersResponse = await client.queryContractSmart(contractAddress, { get_offer: { contract, token_id: tokenId } });
      return result.offers.length > 0 ? result.offers[0]: undefined;
    };

    const offersBySeller = async (seller: string, startAfter?: string, limit?: number): Promise<OffersResponse> => {
      const result = await client.queryContractSmart(contractAddress, { get_offers: { seller, start_after: startAfter, limit: limit } });
      return result;
    };

    const allOffers = async (startAfter?: string, limit?: number): Promise<OffersResponse> => {
      const result = await client.queryContractSmart(contractAddress, { all_offers: { start_after: startAfter, limit: limit } });
      return result;
    };

    return {
      contractAddress,
      numOffers,
      offer,
      offersBySeller,
      allOffers,
    }
  };

  const useTx = (client: SigningCosmWasmClient): MarketTxInstance => {
    const buy = async (sender: string, offerId: string, price: Coin): Promise<string> => {
      const result = await client.execute(sender, contractAddress, { buy: { offering_id: offerId } }, undefined, [price]);
      return result.transactionHash;
    };

    const withdraw = async (sender: string, offerId: string): Promise<string> => {
      const result = await client.execute(sender, contractAddress, { withdraw_nft: { offering_id: offerId } });
      return result.transactionHash;
    };

    return {
      contractAddress,
      buy,
      withdraw,
    };
  };

  return { use, useTx };
}
