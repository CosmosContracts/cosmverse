import { AppConfig, getAppConfig, NetworkConfigs } from "./App/services/config/network";

const local: AppConfig = {
  chainId: "testing",
  chainName: "Testing",
  addressPrefix: "juno",
  rpcUrl: "http://localhost:26657",
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
  rpcUrl: "https://rpc.juno.giansalex.dev",
  httpUrl: "https://lcd.juno.giansalex.dev",
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

export const coinsList = {
  ujuno: { name: "JUNO", decimals: 6 },
  'ibc/555C7A3F9E7709786202410B9CDA64824A34AA2270E9FE8A235B4B8BCE0554B6': { name: "TCRO", decimals: 8}
};

const configs: NetworkConfigs = { local, testnet };
export const config = getAppConfig(configs);
