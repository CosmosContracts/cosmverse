"use strict";
// Copyright (C) 2017 Tony Arcieri
// MIT License. See LICENSE file for details.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../../internals/block");
/**
 * WebCrypto-based implementation of the AES block cipher.
 *
 * This implementation (ab)uses AES-CBC mode to implement AES-ECB. This is
 * likely to be rather slow, as it requires an async call per block, and
 * discards half the buffer.
 *
 * In theory it should be constant time due to the use of WebCrypto (provided
 * the browser's implementation is constant time), but it could probably benefit
 * from some clever optimization work, or improvements to the WebCrypto API.
 *
 * Some WebCrypto implementations (e.g. node-webcrypto-ossl) support ECB mode
 * natively, so we could take advantage of that to potentially encrypt multiple
 * blocks in a single invocation.
 *
 * Key size: 16 or 32 bytes, block size: 16 bytes.
 */
class WebCryptoAes {
    constructor(_crypto, _key) {
        this._crypto = _crypto;
        this._key = _key;
        // An initialization vector of all zeros, exposing the raw AES function
        this._iv = new block_1.default();
        this._emptyPromise = Promise.resolve(this);
    }
    /**
     * Create a new WebCryptoAes instance
     *
     * @param {Crypto} crypto - the Web Cryptography provider
     * @param {Uint8Array} keyData - the AES secret key
     * @returns {Promise<WebCryptoAes}
     */
    static importKey(crypto, keyData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Only AES-128 and AES-256 supported. AES-192 is not.
            if (keyData.length !== 16 && keyData.length !== 32) {
                throw new Error(`Miscreant: invalid key length: ${keyData.length} (expected 16 or 32 bytes)`);
            }
            const key = yield crypto.subtle.importKey("raw", keyData, "AES-CBC", false, ["encrypt"]);
            return new WebCryptoAes(crypto, key);
        });
    }
    /**
     * Cleans expanded keys from memory, setting them to zeros.
     */
    clear() {
        // TODO: perhaps we should clear something, but what, and how?
        return this;
    }
    /**
     * Encrypt a single AES block. While ordinarily this might let us see penguins, we're using it safely
     *
     * @param {Block} block - block to be encrypted in-place
     * @returns {Promise<this>}
     */
    encryptBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { name: "AES-CBC", iv: this._iv.data };
            const ctBlock = yield this._crypto.subtle.encrypt(params, this._key, block.data);
            // TODO: a more efficient way to do in-place encryption?
            block.data.set(new Uint8Array(ctBlock, 0, block_1.default.SIZE));
            return this._emptyPromise;
        });
    }
}
exports.default = WebCryptoAes;
