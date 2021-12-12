"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonrpc_1 = require("../jsonrpc");
const testutil_spec_1 = require("../testutil.spec");
const httpclient_1 = require("./httpclient");
function pendingWithoutTendermint() {
    if (!process.env.TENDERMINT_ENABLED) {
        pending("Set TENDERMINT_ENABLED to enable tendermint rpc tests");
    }
}
describe("HttpClient", () => {
    const tendermintUrl = testutil_spec_1.defaultInstance.url;
    it("can make a simple call", async () => {
        pendingWithoutTendermint();
        const client = new httpclient_1.HttpClient(tendermintUrl);
        const healthResponse = await client.execute(jsonrpc_1.createJsonRpcRequest("health"));
        expect(healthResponse.result).toEqual({});
        const statusResponse = await client.execute(jsonrpc_1.createJsonRpcRequest("status"));
        expect(statusResponse.result).toBeTruthy();
        expect(statusResponse.result.node_info).toBeTruthy();
        await client
            .execute(jsonrpc_1.createJsonRpcRequest("no-such-method"))
            .then(() => fail("must not resolve"))
            .catch((error) => expect(error).toBeTruthy());
        client.disconnect();
    });
});
//# sourceMappingURL=httpclient.spec.js.map