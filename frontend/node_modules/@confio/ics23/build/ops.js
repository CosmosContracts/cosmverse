"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha512_1 = require("js-sha512");
const ripemd160_1 = __importDefault(require("ripemd160"));
const sha_js_1 = __importDefault(require("sha.js"));
const codecimpl_1 = require("./generated/codecimpl");
const helpers_1 = require("./helpers");
function applyLeaf(leaf, key, value) {
    if (key.length === 0) {
        throw new Error("Missing key");
    }
    if (value.length === 0) {
        throw new Error("Missing value");
    }
    const pkey = prepareLeafData(ensureHash(leaf.prehashKey), ensureLength(leaf.length), key);
    const pvalue = prepareLeafData(ensureHash(leaf.prehashValue), ensureLength(leaf.length), value);
    const data = new Uint8Array([
        ...ensureBytes(leaf.prefix),
        ...pkey,
        ...pvalue
    ]);
    return doHash(ensureHash(leaf.hash), data);
}
exports.applyLeaf = applyLeaf;
function applyInner(inner, child) {
    if (child.length === 0) {
        throw new Error("Inner op needs child value");
    }
    const preimage = new Uint8Array([
        ...ensureBytes(inner.prefix),
        ...child,
        ...ensureBytes(inner.suffix)
    ]);
    return doHash(ensureHash(inner.hash), preimage);
}
exports.applyInner = applyInner;
function ensure(maybe, value) {
    return maybe === undefined || maybe === null ? value : maybe;
}
const ensureHash = (h) => ensure(h, codecimpl_1.ics23.HashOp.NO_HASH);
const ensureLength = (l) => ensure(l, codecimpl_1.ics23.LengthOp.NO_PREFIX);
const ensureBytes = (b) => ensure(b, new Uint8Array([]));
function prepareLeafData(hashOp, lengthOp, data) {
    const h = doHashOrNoop(hashOp, data);
    return doLengthOp(lengthOp, h);
}
// doHashOrNoop will return the preimage untouched if hashOp == NONE,
// otherwise, perform doHash
function doHashOrNoop(hashOp, preimage) {
    if (hashOp === codecimpl_1.ics23.HashOp.NO_HASH) {
        return preimage;
    }
    return doHash(hashOp, preimage);
}
function rp160(preimage) {
    // this is a bit tricky to work with besides buffer
    return new Uint8Array(new ripemd160_1.default().update(helpers_1.toHex(preimage), "hex").digest());
}
function s256(preimage) {
    return new Uint8Array(sha_js_1.default("sha256")
        .update(preimage)
        .digest());
}
// doHash will preform the specified hash on the preimage.
// if hashOp == NONE, it will return an error (use doHashOrNoop if you want different behavior)
function doHash(hashOp, preimage) {
    switch (hashOp) {
        case codecimpl_1.ics23.HashOp.SHA256:
            return s256(preimage);
        case codecimpl_1.ics23.HashOp.SHA512:
            return new Uint8Array(sha_js_1.default("sha512")
                .update(preimage)
                .digest());
        case codecimpl_1.ics23.HashOp.RIPEMD160:
            // this requires string or Buffer....
            return rp160(preimage);
        case codecimpl_1.ics23.HashOp.BITCOIN:
            return rp160(s256(preimage));
        case codecimpl_1.ics23.HashOp.SHA512_256:
            return new Uint8Array(js_sha512_1.sha512_256.arrayBuffer(preimage));
    }
    throw new Error(`Unsupported hashop: ${hashOp}`);
}
exports.doHash = doHash;
// doLengthOp will calculate the proper prefix and return it prepended
//   doLengthOp(op, data) -> length(data) || data
function doLengthOp(lengthOp, data) {
    switch (lengthOp) {
        case codecimpl_1.ics23.LengthOp.NO_PREFIX:
            return data;
        case codecimpl_1.ics23.LengthOp.VAR_PROTO:
            return new Uint8Array([...encodeVarintProto(data.length), ...data]);
        case codecimpl_1.ics23.LengthOp.REQUIRE_32_BYTES:
            if (data.length !== 32) {
                throw new Error(`Length is ${data.length}, not 32 bytes`);
            }
            return data;
        case codecimpl_1.ics23.LengthOp.REQUIRE_64_BYTES:
            if (data.length !== 64) {
                throw new Error(`Length is ${data.length}, not 64 bytes`);
            }
            return data;
        case codecimpl_1.ics23.LengthOp.FIXED32_LITTLE:
            return new Uint8Array([...encodeFixed32LE(data.length), ...data]);
        // TODO
        // case LengthOp_VAR_RLP:
        // case LengthOp_FIXED32_BIG:
        // case LengthOp_FIXED64_BIG:
        // case LengthOp_FIXED64_LITTLE:
    }
    throw new Error(`Unsupported lengthop: ${lengthOp}`);
}
function encodeVarintProto(n) {
    let enc = [];
    let l = n;
    while (l >= 128) {
        const b = (l % 128) + 128;
        enc = [...enc, b];
        l = l / 128;
    }
    enc = [...enc, l];
    return new Uint8Array(enc);
}
function encodeFixed32LE(n) {
    const enc = new Uint8Array(4);
    let l = n;
    for (let i = enc.length; i > 0; i--) {
        /* tslint:disable */
        enc[Math.abs(i - enc.length)] = l % 256;
        /* tslint:enable */
        l = Math.floor(l / 256);
    }
    return enc;
}
//# sourceMappingURL=ops.js.map