import { AppConfig, NetworkConfigs, getAppConfig } from "./App/services/config/network";

import croLogo from "./App/assets/tokens/cro.png";
import junoLogo from "./App/assets/tokens/juno.svg";

const local: AppConfig = {
  chainId: "testing",
  chainName: "Testing",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.kingnodes.com/",
  httpUrl: "http://localhost:1317",
  token: {
    coinDenom: "STAKE",
    coinDecimals: 6,
    coinMinimalDenom: "ustake"
  },
  gasPrice: 0.025,
  codeId: 4,
  contract: "",
  marketContract: ""
};

const testnet: AppConfig = {
  chainId: "lucina",
  chainName: "Juno Tesnet",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.kingnodes.com/",
  httpUrl: "https://rpc.uni.kingnodes.com/",
  token: {
    coinDenom: "JUNO",
    coinDecimals: 6,
    coinMinimalDenom: "ujuno"
  },
  gasPrice: 0.025,
  codeId: 4,
  contract: "juno1gnc0533drmdq2u9d70z0fyr9jg74dd2av9gtxw",
  marketContract: "juno16te3h0x8gnwhlunhh383j2jqsv4q556x22gtj0"
};


export interface Token {
  readonly denom: string;
  readonly name: string;
  readonly decimals: number;
  readonly logo?: string
}

export const coins: Token[] = [
  {
    denom: "ujuno",
    name: "JUNO",
    decimals: 6,
    logo: junoLogo,
  },
  {
    denom: "ibc/555C7A3F9E7709786202410B9CDA64824A34AA2270E9FE8A235B4B8BCE0554B6",
    name: "TCRO",
    decimals: 6,
    logo: croLogo,
  },
];

const configs: NetworkConfigs = { local, testnet };
export const config = getAppConfig(configs);
