"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const webcrypto_1 = require("./providers/webcrypto");
const siv_1 = require("./siv");
/** AEAD interface provider for ISIVLike types */
class AEAD {
    /** Create a new AEAD instance with the given key */
    static importKey(keyData, alg, provider = new webcrypto_1.WebCryptoProvider()) {
        return __awaiter(this, void 0, void 0, function* () {
            return new AEAD(yield siv_1.SIV.importKey(keyData, alg, provider));
        });
    }
    constructor(siv) {
        this._siv = siv;
    }
    /** Encrypt and authenticate data using AES-SIV */
    seal(plaintext, nonce, associatedData = new Uint8Array(0)) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._siv.seal(plaintext, [associatedData, nonce]);
        });
    }
    /** Decrypt and authenticate data using AES-SIV */
    open(ciphertext, nonce, associatedData = new Uint8Array(0)) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._siv.open(ciphertext, [associatedData, nonce]);
        });
    }
    /** Make a best effort to wipe memory used by this instance */
    clear() {
        this._siv.clear();
        return this;
    }
}
exports.AEAD = AEAD;
