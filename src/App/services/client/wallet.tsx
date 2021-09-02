import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppConfig } from "../config/network";
import { createClient, createSimpleClient } from "./sdk";

interface CosmWasmContextType {
  readonly initialized: boolean;
  readonly init: (signer: OfflineSigner) => void;
  readonly clear: () => void;
  readonly config: Partial<AppConfig>;
  readonly client: CosmWasmClient | undefined;
  readonly changeConfig: (updates: Partial<AppConfig>) => void;
  readonly address: string;
  readonly balance: readonly Coin[];
  readonly refreshBalance: () => Promise<void>;
  readonly getSigner: () => OfflineSigner | undefined;
  readonly changeSigner: (newSigner: OfflineSigner) => void;
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
  client: undefined,
  changeConfig: throwNotInitialized,
  address: "",
  balance: [],
  refreshBalance: throwNotInitialized,
  getSigner: () => undefined,
  changeSigner: throwNotInitialized,
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

  const contextWithInit = useMemo(() => ({ ...defaultContext, init: setSigner }), []);
  const [value, setValue] = useState<CosmWasmContextType>(contextWithInit);

  const clear = useCallback(() => {
    setValue({ ...contextWithInit });
    setClient(undefined);
    setSigner(undefined);
    setConfig(configProp);
  }, [contextWithInit, configProp]);

  function changeConfig(updates: Partial<AppConfig>): void {
    setConfig((config) => ({ ...config, ...updates }));
  }

  const refreshBalance = useCallback(async (address: string, balance: Coin[]): Promise<void> => {
    if (!client) return;

    balance.length = 0;
    const coin = await client.getBalance(address, config.token.coinMinimalDenom);
    if (coin) balance.push(coin);
  }, [client, config]);

  useEffect(() => {
    (async function updateClient(): Promise<void> {
      // TODO: Catch errors
      const client = await createSimpleClient(config);
      setClient(client);
      setValue({ ...contextWithInit, client })
    })();
  }, [contextWithInit, config]);

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
        client,
        changeConfig,
        address,
        balance,
        refreshBalance: refreshBalance.bind(null, address, balance),
        getSigner: () => signer,
        changeSigner: setSigner,
        getSignClient: () => signClient,
      });
    })();
  }, [signClient, signer, clear, client, config, refreshBalance]);

  return <CosmWasmContext.Provider value={value}>{children}</CosmWasmContext.Provider>;
}
