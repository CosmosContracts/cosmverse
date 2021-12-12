"use strict";
// Base symbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProtobufRpcClient = exports.createPagination = exports.setupStakingExtension = exports.setupIbcExtension = exports.setupDistributionExtension = exports.setupBankExtension = exports.setupAuthExtension = exports.QueryClient = void 0;
var queryclient_1 = require("./queryclient");
Object.defineProperty(exports, "QueryClient", { enumerable: true, get: function () { return queryclient_1.QueryClient; } });
// Extensions
var auth_1 = require("./auth");
Object.defineProperty(exports, "setupAuthExtension", { enumerable: true, get: function () { return auth_1.setupAuthExtension; } });
var bank_1 = require("./bank");
Object.defineProperty(exports, "setupBankExtension", { enumerable: true, get: function () { return bank_1.setupBankExtension; } });
var distribution_1 = require("./distribution");
Object.defineProperty(exports, "setupDistributionExtension", { enumerable: true, get: function () { return distribution_1.setupDistributionExtension; } });
var ibc_1 = require("./ibc");
Object.defineProperty(exports, "setupIbcExtension", { enumerable: true, get: function () { return ibc_1.setupIbcExtension; } });
var staking_1 = require("./staking");
Object.defineProperty(exports, "setupStakingExtension", { enumerable: true, get: function () { return staking_1.setupStakingExtension; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "createPagination", { enumerable: true, get: function () { return utils_1.createPagination; } });
Object.defineProperty(exports, "createProtobufRpcClient", { enumerable: true, get: function () { return utils_1.createProtobufRpcClient; } });
//# sourceMappingURL=index.js.map