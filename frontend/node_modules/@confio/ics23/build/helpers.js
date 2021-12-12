"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toHex(data) {
    let out = "";
    for (const byte of data) {
        out += ("0" + byte.toString(16)).slice(-2);
    }
    return out;
}
exports.toHex = toHex;
function fromHex(hexstring) {
    if (hexstring.length % 2 !== 0) {
        throw new Error("hex string length must be a multiple of 2");
    }
    // tslint:disable-next-line:readonly-array
    const listOfInts = [];
    for (let i = 0; i < hexstring.length; i += 2) {
        const hexByteAsString = hexstring.substr(i, 2);
        if (!hexByteAsString.match(/[0-9a-f]{2}/i)) {
            throw new Error("hex string contains invalid characters");
        }
        listOfInts.push(parseInt(hexByteAsString, 16));
    }
    return new Uint8Array(listOfInts);
}
exports.fromHex = fromHex;
function toAscii(input) {
    const toNums = (str) => str.split("").map((x) => {
        const charCode = x.charCodeAt(0);
        // 0x00–0x1F control characters
        // 0x20–0x7E printable characters
        // 0x7F delete character
        // 0x80–0xFF out of 7 bit ascii range
        if (charCode < 0x20 || charCode > 0x7e) {
            throw new Error("Cannot encode character that is out of printable ASCII range: " +
                charCode);
        }
        return charCode;
    });
    return Uint8Array.from(toNums(input));
}
exports.toAscii = toAscii;
function fromAscii(data) {
    const fromNums = (listOfNumbers) => listOfNumbers.map((x) => {
        // 0x00–0x1F control characters
        // 0x20–0x7E printable characters
        // 0x7F delete character
        // 0x80–0xFF out of 7 bit ascii range
        if (x < 0x20 || x > 0x7e) {
            throw new Error("Cannot decode character that is out of printable ASCII range: " + x);
        }
        return String.fromCharCode(x);
    });
    return fromNums(Array.from(data)).join("");
}
exports.fromAscii = fromAscii;
//# sourceMappingURL=helpers.js.map