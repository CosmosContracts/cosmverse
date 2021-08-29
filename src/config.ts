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
  contract: ""
};

const testnet: AppConfig = {
  chainId: "lucina",
  chainName: "Juno Tesnet",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.juno.omniflix.co",
  httpUrl: "https://api.juno.omniflix.co",
  token: {
    coinDenom: "JUNO",
    coinDecimals: 6,
    coinMinimalDenom: "ujuno"
  },
  gasPrice: 0.025,
  codeId: 4,
  contract: "juno1kz940rx78rw7p0pqhfresv03k4rtnkdjhq0myt"
};

const configs: NetworkConfigs = { local, testnet };
export const config = getAppConfig(configs);
