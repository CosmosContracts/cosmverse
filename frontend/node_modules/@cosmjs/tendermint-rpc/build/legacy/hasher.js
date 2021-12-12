"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashBlock = exports.hashTx = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encodings_1 = require("./encodings");
// hash is sha256
// https://github.com/tendermint/tendermint/blob/master/UPGRADING.md#v0260
function hashTx(tx) {
    return crypto_1.sha256(tx);
}
exports.hashTx = hashTx;
function getSplitPoint(n) {
    if (n < 1)
        throw new Error("Cannot split an empty tree");
    const largestPowerOf2 = 2 ** Math.floor(Math.log2(n));
    return largestPowerOf2 < n ? largestPowerOf2 : largestPowerOf2 / 2;
}
function hashLeaf(leaf) {
    const hash = new crypto_1.Sha256(Uint8Array.from([0]));
    hash.update(leaf);
    return hash.digest();
}
function hashInner(left, right) {
    const hash = new crypto_1.Sha256(Uint8Array.from([1]));
    hash.update(left);
    hash.update(right);
    return hash.digest();
}
// See https://github.com/tendermint/tendermint/blob/v0.31.8/docs/spec/blockchain/encoding.md#merkleroot
// Note: the hashes input may not actually be hashes, especially before a recursive call
function hashTree(hashes) {
    switch (hashes.length) {
        case 0:
            throw new Error("Cannot hash empty tree");
        case 1:
            return hashLeaf(hashes[0]);
        default: {
            const slicePoint = getSplitPoint(hashes.length);
            const left = hashTree(hashes.slice(0, slicePoint));
            const right = hashTree(hashes.slice(slicePoint));
            return hashInner(left, right);
        }
    }
}
function hashBlock(header) {
    const encodedFields = [
        encodings_1.encodeVersion(header.version),
        encodings_1.encodeString(header.chainId),
        encodings_1.encodeInt(header.height),
        encodings_1.encodeTime(header.time),
        encodings_1.encodeBlockId(header.lastBlockId),
        encodings_1.encodeBytes(header.lastCommitHash),
        encodings_1.encodeBytes(header.dataHash),
        encodings_1.encodeBytes(header.validatorsHash),
        encodings_1.encodeBytes(header.nextValidatorsHash),
        encodings_1.encodeBytes(header.consensusHash),
        encodings_1.encodeBytes(header.appHash),
        encodings_1.encodeBytes(header.lastResultsHash),
        encodings_1.encodeBytes(header.evidenceHash),
        encodings_1.encodeBytes(header.proposerAddress),
    ];
    return hashTree(encodedFields);
}
exports.hashBlock = hashBlock;
//# sourceMappingURL=hasher.js.map