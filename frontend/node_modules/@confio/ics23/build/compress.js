"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codecimpl_1 = require("./generated/codecimpl");
function compress(proof) {
    if (!proof.batch) {
        return proof;
    }
    return { compressed: compress_batch(proof.batch) };
}
exports.compress = compress;
function decompress(proof) {
    if (!proof.compressed) {
        return proof;
    }
    return { batch: decompress_batch(proof.compressed) };
}
exports.decompress = decompress;
// tslint:disable:readonly-array
function compress_batch(proof) {
    const centries = [];
    const lookup = [];
    const registry = new Map();
    for (const entry of proof.entries) {
        if (!!entry.exist) {
            const centry = { exist: compress_exist(entry.exist, lookup, registry) };
            centries.push(centry);
        }
        else if (!!entry.nonexist) {
            const non = entry.nonexist;
            const centry = {
                nonexist: {
                    key: non.key,
                    left: compress_exist(non.left, lookup, registry),
                    right: compress_exist(non.right, lookup, registry)
                }
            };
            centries.push(centry);
        }
        else {
            throw new Error("Unexpected batch entry during compress");
        }
    }
    return {
        entries: centries,
        lookupInners: lookup
    };
}
function compress_exist(exist, lookup, registry) {
    if (!exist) {
        return undefined;
    }
    const path = exist.path.map(inner => {
        const sig = codecimpl_1.ics23.InnerOp.encode(inner).finish();
        let idx = registry.get(sig);
        if (idx === undefined) {
            idx = lookup.length;
            lookup.push(inner);
            registry.set(sig, idx);
        }
        return idx;
    });
    return {
        key: exist.key,
        value: exist.value,
        leaf: exist.leaf,
        path
    };
}
function decompress_batch(proof) {
    const lookup = proof.lookupInners;
    const entries = proof.entries.map(comp => {
        if (!!comp.exist) {
            return { exist: decompress_exist(comp.exist, lookup) };
        }
        else if (!!comp.nonexist) {
            const non = comp.nonexist;
            return {
                nonexist: {
                    key: non.key,
                    left: decompress_exist(non.left, lookup),
                    right: decompress_exist(non.right, lookup)
                }
            };
        }
        else {
            throw new Error("Unexpected batch entry during compress");
        }
    });
    return {
        entries
    };
}
function decompress_exist(exist, lookup) {
    if (!exist) {
        return undefined;
    }
    const { key, value, leaf, path } = exist;
    const newPath = (path || []).map(idx => lookup[idx]);
    return { key, value, leaf, path: newPath };
}
//# sourceMappingURL=compress.js.map