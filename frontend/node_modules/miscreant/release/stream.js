"use strict";
/**
 * The STREAM online authenticated encryption construction.
 * See <https://eprint.iacr.org/2015/189.pdf> for definition.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aead_1 = require("./aead");
const webcrypto_1 = require("./providers/webcrypto");
/** Size of a nonce required by STREAM in bytes */
exports.NONCE_SIZE = 8;
/** Byte flag indicating this is the last block in the STREAM (otherwise 0) */
exports.LAST_BLOCK_FLAG = 1;
/** Maximum value of the counter STREAM uses internally to identify messages */
exports.COUNTER_MAX = 0xFFFFFFFF;
/**
 * A STREAM encryptor with a 32-bit counter, generalized for any AEAD algorithm
 *
 * This corresponds to the ℰ stream encryptor object as defined in the paper
 * Online Authenticated-Encryption and its Nonce-Reuse Misuse-Resistance
 */
class StreamEncryptor {
    /** Create a new StreamEncryptor instance with the given key */
    static importKey(keyData, nonce, alg, provider = new webcrypto_1.WebCryptoProvider()) {
        return __awaiter(this, void 0, void 0, function* () {
            return new StreamEncryptor(yield aead_1.AEAD.importKey(keyData, alg, provider), nonce);
        });
    }
    constructor(aead, nonce) {
        this._aead = aead;
        this._nonce_encoder = new NonceEncoder(nonce);
    }
    /** Encrypt and authenticate data using the selected AEAD algorithm */
    seal(plaintext, lastBlock = false, associatedData = new Uint8Array(0)) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._aead.seal(plaintext, this._nonce_encoder.next(lastBlock), associatedData);
        });
    }
    /** Make a best effort to wipe memory used by this instance */
    clear() {
        this._aead.clear();
        return this;
    }
}
exports.StreamEncryptor = StreamEncryptor;
/**
 * A STREAM decryptor with a 32-bit counter, generalized for any AEAD algorithm
 *
 * This corresponds to the 𝒟 stream decryptor object as defined in the paper
 * Online Authenticated-Encryption and its Nonce-Reuse Misuse-Resistance
 */
class StreamDecryptor {
    /** Create a new StreamDecryptor instance with the given key */
    static importKey(keyData, nonce, alg, provider = new webcrypto_1.WebCryptoProvider()) {
        return __awaiter(this, void 0, void 0, function* () {
            return new StreamDecryptor(yield aead_1.AEAD.importKey(keyData, alg, provider), nonce);
        });
    }
    constructor(aead, nonce) {
        this._aead = aead;
        this._nonce_encoder = new NonceEncoder(nonce);
    }
    /** Decrypt and authenticate data using the selected AEAD algorithm */
    open(ciphertext, lastBlock = false, associatedData = new Uint8Array(0)) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._aead.open(ciphertext, this._nonce_encoder.next(lastBlock), associatedData);
        });
    }
    /** Make a best effort to wipe memory used by this instance */
    clear() {
        this._aead.clear();
        return this;
    }
}
exports.StreamDecryptor = StreamDecryptor;
/** Computes STREAM nonces based on the current position in the STREAM. */
class NonceEncoder {
    constructor(noncePrefix) {
        if (noncePrefix.length !== exports.NONCE_SIZE) {
            throw new Error(`STREAM: nonce must be 8-bits (got ${noncePrefix.length}`);
        }
        this.buffer = new ArrayBuffer(exports.NONCE_SIZE + 4 + 1);
        this.view = new DataView(this.buffer);
        this.array = new Uint8Array(this.buffer);
        this.array.set(noncePrefix);
        this.counter = 0;
        this.finished = false;
    }
    /** Compute the next nonce value, incrementing the internal counter */
    next(lastBlock) {
        if (this.finished) {
            throw new Error("STREAM: already finished");
        }
        this.view.setInt32(8, this.counter, false);
        if (lastBlock) {
            this.view.setInt8(12, exports.LAST_BLOCK_FLAG);
            this.finished = true;
        }
        else {
            this.counter += 1;
            if (this.counter > exports.COUNTER_MAX) {
                throw new Error("STREAM counter overflowed");
            }
        }
        return this.array;
    }
}
