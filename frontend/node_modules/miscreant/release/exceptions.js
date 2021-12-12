"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
/** Thrown when ciphertext fails to verify as authentic */
class IntegrityError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, IntegrityError.prototype);
    }
}
exports.IntegrityError = IntegrityError;
/** Thrown when we attempt to use an unsupported crypto algorithm via WebCrypto */
class NotImplementedError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
exports.NotImplementedError = NotImplementedError;
