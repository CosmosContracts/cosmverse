import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppConfig } from "../config/network";
import { createClient, createSimpleClient } from "./sdk";

interface CosmWasmContextType {
  readonly initialized: boolean;
  readonly init: (signer: OfflineSigner) => void;
  readonly clear: () => void;
  readonly config: Partial<AppConfig>;
  readonly changeConfig: (updates: Partial<AppConfig>) => void;
  readonly address: string;
  readonly balance: readonly Coin[];
  readonly refreshBalance: () => Promise<void>;
  readonly getSigner: () => OfflineSigner | undefined;
  readonly changeSigner: (newSigner: OfflineSigner) => void;
  readonly getClient: () => CosmWasmClient;
  readonly getSignClient: () => SigningCosmWasmClient | undefined;
}

function throwNotInitialized(): any {
  throw new Error("Not yet initialized");
}

const defaultContext: CosmWasmContextType = {
  initialized: false,
  init: throwNotInitialized,
  clear: throwNotInitialized,
  config: {},
  changeConfig: throwNotInitialized,
  address: "",
  balance: [],
  refreshBalance: throwNotInitialized,
  getSigner: () => undefined,
  changeSigner: throwNotInitialized,
  getClient: throwNotInitialized,
  getSignClient: () => undefined,
};

const CosmWasmContext = React.createContext<CosmWasmContextType>(defaultContext);

export const useSdk = (): CosmWasmContextType => React.useContext(CosmWasmContext);

interface SdkProviderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  readonly config: AppConfig;
}

export function SdkProvider({ config: configProp, children }: SdkProviderProps): JSX.Element {
  const [config, setConfig] = useState(configProp);
  const [signer, setSigner] = useState<OfflineSigner>();
  const [client, setClient] = useState<CosmWasmClient>();
  const [signClient, setSignClient] = useState<SigningCosmWasmClient>();

  const contextWithInit = { ...defaultContext, init: setSigner };
  const [value, setValue] = useState<CosmWasmContextType>(contextWithInit);

  function clear(): void {
    setValue({ ...contextWithInit });
    setClient(undefined);
    setSigner(undefined);
    setConfig(configProp);
  }

  function changeConfig(updates: Partial<AppConfig>): void {
    setConfig((config) => ({ ...config, ...updates }));
  }

  // Get balance for each coin specified in config.coinMap
  async function refreshBalance(address: string, balance: Coin[]): Promise<void> {
    if (!client) return;

    balance.length = 0;
    const coin = await client.getBalance(address, config.token.coinMinimalDenom);
    if (coin) balance.push(coin);
  }

  useEffect(() => {
    (async function updateClient(): Promise<void> {
      // TODO: Catch errors
      const client = await createSimpleClient(config);
      setClient(client);
    })();
  }, [config]);

  useEffect(() => {
    if (!signer) return;

    (async function updateSignClient(): Promise<void> {
      // TODO: Catch errors
      const client = await createClient(config, signer);
      setSignClient(client);
    })();
  }, [signer, config]);

  useEffect(() => {
    if (!signer || !client || !signClient) return;

    const balance: Coin[] = [];

    (async function updateValue(): Promise<void> {
      const address = (await signer.getAccounts())[0].address;

      await refreshBalance(address, balance);

      setValue({
        initialized: true,
        init: () => {},
        clear,
        config,
        changeConfig,
        address,
        balance,
        refreshBalance: refreshBalance.bind(null, address, balance),
        getSigner: () => signer,
        changeSigner: setSigner,
        getClient: () => client,
        getSignClient: () => signClient,
      });
    })();
  }, [signClient]);

  return <CosmWasmContext.Provider value={value}>{children}</CosmWasmContext.Provider>;
}
