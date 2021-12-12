"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStakingExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const long_1 = __importDefault(require("long"));
const query_1 = require("../codec/cosmos/staking/v1beta1/query");
const utils_1 = require("./utils");
function setupStakingExtension(base) {
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const rpc = utils_1.createProtobufRpcClient(base);
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        staking: {
            delegation: async (delegatorAddress, validatorAddress) => {
                const response = await queryService.Delegation({
                    delegatorAddr: delegatorAddress,
                    validatorAddr: validatorAddress,
                });
                return response;
            },
            delegatorDelegations: async (delegatorAddress, paginationKey) => {
                const response = await queryService.DelegatorDelegations({
                    delegatorAddr: delegatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            delegatorUnbondingDelegations: async (delegatorAddress, paginationKey) => {
                const response = await queryService.DelegatorUnbondingDelegations({
                    delegatorAddr: delegatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            delegatorValidator: async (delegatorAddress, validatorAddress) => {
                const response = await queryService.DelegatorValidator({
                    delegatorAddr: delegatorAddress,
                    validatorAddr: validatorAddress,
                });
                return response;
            },
            delegatorValidators: async (delegatorAddress, paginationKey) => {
                const response = await queryService.DelegatorValidators({
                    delegatorAddr: delegatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            historicalInfo: async (height) => {
                const response = await queryService.HistoricalInfo({
                    height: long_1.default.fromNumber(height, true),
                });
                return response;
            },
            params: async () => {
                const response = await queryService.Params({});
                return response;
            },
            pool: async () => {
                const response = await queryService.Pool({});
                return response;
            },
            redelegations: async (delegatorAddress, sourceValidatorAddress, destinationValidatorAddress, paginationKey) => {
                const response = await queryService.Redelegations({
                    delegatorAddr: delegatorAddress,
                    srcValidatorAddr: sourceValidatorAddress,
                    dstValidatorAddr: destinationValidatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            unbondingDelegation: async (delegatorAddress, validatorAddress) => {
                const response = await queryService.UnbondingDelegation({
                    delegatorAddr: delegatorAddress,
                    validatorAddr: validatorAddress,
                });
                return response;
            },
            validator: async (validatorAddress) => {
                const response = await queryService.Validator({ validatorAddr: validatorAddress });
                return response;
            },
            validatorDelegations: async (validatorAddress, paginationKey) => {
                const response = await queryService.ValidatorDelegations({
                    validatorAddr: validatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            validators: async (status, paginationKey) => {
                const response = await queryService.Validators({
                    status: status,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
            validatorUnbondingDelegations: async (validatorAddress, paginationKey) => {
                const response = await queryService.ValidatorUnbondingDelegations({
                    validatorAddr: validatorAddress,
                    pagination: utils_1.createPagination(paginationKey),
                });
                return response;
            },
        },
    };
}
exports.setupStakingExtension = setupStakingExtension;
//# sourceMappingURL=staking.js.map