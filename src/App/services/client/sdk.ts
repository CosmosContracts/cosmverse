import { CosmWasmFeeTable } from "@cosmjs/cosmwasm-stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { defaultGasLimits as defaultStargateGasLimits, GasLimits, GasPrice, makeCosmoshubPath, } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";

import { AppConfig } from "../config/network";

export type WalletLoader = (chainId: string, addressPrefix?: string) => Promise<OfflineSigner>;

export async function loadKeplrWallet(chainId: string): Promise<OfflineSigner> {
  const anyWindow = window as KeplrWindow;
  if (!anyWindow.getOfflineSigner) {
    throw new Error("Keplr extension is not available");
  }

  const signer = anyWindow.getOfflineSigner(chainId);

  return Promise.resolve(signer);
}

// this creates a new connection to a server at URL,
export async function createClient(config: AppConfig, signer: OfflineSigner): Promise<SigningCosmWasmClient> {
  const gasLimits: GasLimits<CosmWasmFeeTable> = {
    ...defaultStargateGasLimits,
    upload: 1500000,
    init: 600000,
    exec: 400000,
    migrate: 600000,
    send: 80000,
    changeAdmin: 80000,
  };

  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
    gasLimits: gasLimits,
  });
}
