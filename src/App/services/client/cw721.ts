import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface NftInfoResponse {
  /**
   * Describes the asset to which this NFT represents
   */
  description: string
  /**
   * "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive. TODO: Use https://docs.rs/url_serde for type-safety
   */
  image: string
  /**
   * Identifies the asset to which this NFT represents
   */
  name: string
}

export interface TokensResponse {
  /**
   * Contains all token_ids in lexicographical ordering If there are more than `limit`, use `start_from` in future queries to achieve pagination.
   */
  tokens: string[]
}


export interface NftMsg {
  /**
   * Describes the asset to which this NFT represents (may be empty)
   */
  description?: string | null
  /**
   * A URI pointing to an image representing the asset
   */
  image: string
  /**
   * Identifies the asset to which this NFT represents
   */
  name: string
  /**
   * The owner of the newly minter NFT
   */
  owner: string
  /**
   * Unique ID of the NFT
   */
  token_id: string
}

export interface CW721Instance {
  readonly contractAddress: string;

  /**
   * @returns owner address
   */
  ownerOf: (tokenId: string) => Promise<string>;
  numTokens: () => Promise<number>;
  nftInfo: (tokenId: string) => Promise<NftInfoResponse>;
  tokens: (owner: string, startAfter?: string, limit?: number) => Promise<TokensResponse>;
  allTokens: (startAfter?: string, limit?: number) => Promise<TokensResponse>;
  minter: () => Promise<any>;
}

export interface CW721TxInstance {
  readonly contractAddress: string;

  // actions
  mint: (sender: string, nft: NftMsg) => Promise<string>;
  transfer: (sender: string, recipient: string, tokenId: string) => Promise<string>;
  send: (sender: string, contract: string, msg: Record<string, unknown>, tokenId: string) => Promise<string>;
}


export interface CW721Contract {
  use: (client: CosmWasmClient) => CW721Instance;
  useTx: (client: SigningCosmWasmClient) => CW721TxInstance;
}

export const CW721 = (contractAddress: string): CW721Contract => {
  const use = (client: CosmWasmClient): CW721Instance => {
    const ownerOf = async (tokenId: string): Promise<string> => {
      const result = await client.queryContractSmart(contractAddress, { owner_of: { token_id: tokenId } });
      return result.owner;
    };

    const numTokens = async (): Promise<number> => {
      const result = await client.queryContractSmart(contractAddress, { num_tokens: {} });
      return result.count;
    };

    const nftInfo = async (tokenId: string): Promise<NftInfoResponse> => {
      const result = await client.queryContractSmart(contractAddress, { nft_info: { token_id: tokenId } });
      return result;
    };

    const tokens = async (owner: string, startAfter?: string, limit?: number): Promise<TokensResponse> => {
      const result = await client.queryContractSmart(contractAddress, { tokens: { owner: owner, start_after: startAfter, limit: limit } });
      return result;
    };

    const allTokens = async (startAfter?: string, limit?: number): Promise<TokensResponse> => {
      const result = await client.queryContractSmart(contractAddress, { all_tokens: { start_after: startAfter, limit: limit } });
      return result;
    };

    const minter = async (): Promise<any> => {
      const result = await client.queryContractSmart(contractAddress, { minter: {} });
      return result.minter;
    };

    return {
      contractAddress,
      ownerOf,
      numTokens,
      nftInfo,
      tokens,
      allTokens,
      minter,
    }
  };

  const useTx = (client: SigningCosmWasmClient): CW721TxInstance => {
    const mint = async (sender: string, nft: NftMsg): Promise<string> => {
      const result = await client.execute(sender, contractAddress, { mint: nft });
      return result.transactionHash;
    };

    const transfer = async (sender: string, recipient: string, tokenId: string): Promise<string> => {
      const result = await client.execute(sender, contractAddress, { transfer_nft: { recipient, token_id: tokenId } });
      return result.transactionHash;
    };

    const send = async (sender: string, contract: string, msg: Record<string, unknown>, tokenId: string): Promise<string> => {
      const result = await client.execute(sender, contractAddress, {
        send_nft: {
          contract,
          token_id: tokenId,
          msg: btoa(JSON.stringify(msg))
        }
      });
      return result.transactionHash;
    };

    return {
      contractAddress,
      mint,
      transfer,
      send
    };
  };

  return { use, useTx };
}
