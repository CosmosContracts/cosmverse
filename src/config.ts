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
  contract: "juno167zj5p5l5t05jrajqvdx3esmc85mmxmv7lucy0",
  marketContract: "juno1c2qje62nl0ecj9uwg607se9nxgccu5aatm3423"
};

export const coinsList = {
  ujuno: { name: "JUNO", decimals: 6 },
};

const configs: NetworkConfigs = { local, testnet };
export const config = getAppConfig(configs);
