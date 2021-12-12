"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBankExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const utils_1 = require("@cosmjs/utils");
const query_1 = require("../codec/cosmos/bank/v1beta1/query");
const coin_1 = require("../codec/cosmos/base/v1beta1/coin");
const utils_2 = require("./utils");
function setupBankExtension(base) {
    const rpc = utils_2.createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        bank: {
            balance: async (address, denom) => {
                const { balance } = await queryService.Balance({ address: address, denom: denom });
                utils_1.assert(balance);
                return balance;
            },
            allBalances: async (address) => {
                const { balances } = await queryService.AllBalances({ address: address });
                return balances;
            },
            totalSupply: async () => {
                const { supply } = await queryService.TotalSupply({});
                return supply;
            },
            supplyOf: async (denom) => {
                const { amount } = await queryService.SupplyOf({ denom: denom });
                utils_1.assert(amount);
                return amount;
            },
            verified: {
                balance: async (address, denom) => {
                    // balance key is a bit tricker, using some prefix stores
                    // https://github.com/cosmwasm/cosmos-sdk/blob/80f7ff62f79777a487d0c7a53c64b0f7e43c47b9/x/bank/keeper/view.go#L74-L77
                    // ("balances", binAddress, denom)
                    // it seem like prefix stores just do a dumb concat with the keys (no tricks to avoid overlap)
                    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L61-L64
                    // https://github.com/cosmos/cosmos-sdk/blob/2879c0702c87dc9dd828a8c42b9224dc054e28ad/store/prefix/store.go#L37-L43
                    const key = Uint8Array.from([...encoding_1.toAscii("balances"), ...utils_2.toAccAddress(address), ...encoding_1.toAscii(denom)]);
                    const responseData = await base.queryVerified("bank", key);
                    return responseData.length ? coin_1.Coin.decode(responseData) : null;
                },
            },
        },
    };
}
exports.setupBankExtension = setupBankExtension;
//# sourceMappingURL=bank.js.map