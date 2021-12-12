import { ChainInfo, Currency } from "@keplr-wallet/types";

export interface AppConfig {
  readonly chainId: string;
  readonly chainName: string;
  readonly addressPrefix: string;
  readonly rpcUrl: string;
  readonly httpUrl: string;
  readonly token: Currency;
  readonly gasPrice: number;
  readonly codeId: number;
  readonly contract: string;
  readonly marketContract: string;
}

export interface NetworkConfigs {
  readonly testnet: AppConfig;
  readonly [key: string]: AppConfig;
}

export function getAppConfig(configs: NetworkConfigs): AppConfig {
  const network = process.env.REACT_APP_NETWORK;
  if (!network) return configs.testnet;

  const config = configs[network];
  if (!config) {
    throw new Error(`No configuration found for network ${network}`);
  }

  return config;
}

export function configKeplr(config: AppConfig): ChainInfo {
  return {
    chainId: config.chainId,
    chainName: config.chainName,
    rpc: config.rpcUrl,
    rest: config.httpUrl,
    bech32Config: {
      bech32PrefixAccAddr: `${config.addressPrefix}`,
      bech32PrefixAccPub: `${config.addressPrefix}pub`,
      bech32PrefixValAddr: `${config.addressPrefix}valoper`,
      bech32PrefixValPub: `${config.addressPrefix}valoperpub`,
      bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
      bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
    },
    currencies: [config.token],
    feeCurrencies: [config.token],
    stakeCurrency: config.token,
    gasPriceStep: {
      low: config.gasPrice / 2,
      average: config.gasPrice,
      high: config.gasPrice * 2,
    },
    bip44: { coinType: 118 },
    coinType: 118,
    features: ["stargate", 'ibc-transfer', 'cosmwasm']
  };
}
