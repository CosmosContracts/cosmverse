"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
const utils_1 = require("@iov/utils");
const cosmwasmclient_1 = require("./cosmwasmclient");
const encoding_1 = require("./encoding");
const pen_1 = require("./pen");
const restclient_1 = require("./restclient");
const signingcosmwasmclient_1 = require("./signingcosmwasmclient");
const testutils_spec_1 = require("./testutils.spec");
const types_1 = require("./types");
describe("CosmWasmClient.searchTx", () => {
    let sendSuccessful;
    let sendUnsuccessful;
    let postedExecute;
    beforeAll(async () => {
        if (testutils_spec_1.wasmdEnabled()) {
            const pen = await pen_1.Secp256k1Pen.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = new signingcosmwasmclient_1.SigningCosmWasmClient(testutils_spec_1.wasmd.endpoint, testutils_spec_1.faucet.address, (signBytes) => pen.sign(signBytes));
            {
                const recipient = testutils_spec_1.makeRandomAddress();
                const transferAmount = {
                    denom: "ucosm",
                    amount: "1234567",
                };
                const result = await client.sendTokens(recipient, [transferAmount]);
                await utils_1.sleep(50); // wait until tx is indexed
                const txDetails = await new restclient_1.RestClient(testutils_spec_1.wasmd.endpoint).txById(result.transactionHash);
                sendSuccessful = {
                    sender: testutils_spec_1.faucet.address,
                    recipient: recipient,
                    hash: result.transactionHash,
                    height: Number.parseInt(txDetails.height, 10),
                    tx: txDetails.tx,
                };
            }
            {
                const memo = "Sending more than I can afford";
                const recipient = testutils_spec_1.makeRandomAddress();
                const transferAmount = [
                    {
                        denom: "ucosm",
                        amount: "123456700000000",
                    },
                ];
                const sendMsg = {
                    type: "cosmos-sdk/MsgSend",
                    value: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        from_address: testutils_spec_1.faucet.address,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        to_address: recipient,
                        amount: transferAmount,
                    },
                };
                const fee = {
                    amount: [
                        {
                            denom: "ucosm",
                            amount: "2000",
                        },
                    ],
                    gas: "80000",
                };
                const { accountNumber, sequence } = await client.getNonce();
                const chainId = await client.getChainId();
                const signBytes = encoding_1.makeSignBytes([sendMsg], fee, chainId, memo, accountNumber, sequence);
                const signature = await pen.sign(signBytes);
                const tx = {
                    type: "cosmos-sdk/StdTx",
                    value: {
                        msg: [sendMsg],
                        fee: fee,
                        memo: memo,
                        signatures: [signature],
                    },
                };
                const transactionId = await client.getIdentifier(tx);
                const heightBeforeThis = await client.getHeight();
                try {
                    await client.postTx(tx.value);
                }
                catch (error) {
                    // postTx() throws on execution failures, which is a questionable design. Ignore for now.
                    // console.log(error);
                }
                sendUnsuccessful = {
                    sender: testutils_spec_1.faucet.address,
                    recipient: recipient,
                    hash: transactionId,
                    height: heightBeforeThis + 1,
                    tx: tx,
                };
            }
            {
                const hashInstance = testutils_spec_1.deployedErc20.instances[0];
                const msg = {
                    approve: {
                        spender: testutils_spec_1.makeRandomAddress(),
                        amount: "12",
                    },
                };
                const result = await client.execute(hashInstance, msg);
                await utils_1.sleep(50); // wait until tx is indexed
                const txDetails = await new restclient_1.RestClient(testutils_spec_1.wasmd.endpoint).txById(result.transactionHash);
                postedExecute = {
                    sender: testutils_spec_1.faucet.address,
                    contract: hashInstance,
                    hash: result.transactionHash,
                    height: Number.parseInt(txDetails.height, 10),
                    tx: txDetails.tx,
                };
            }
        }
    });
    describe("with SearchByIdQuery", () => {
        it("can search successful tx by ID", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const result = await client.searchTx({ id: sendSuccessful.hash });
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(jasmine.objectContaining({
                height: sendSuccessful.height,
                hash: sendSuccessful.hash,
                code: 0,
                tx: sendSuccessful.tx,
            }));
        });
        it("can search unsuccessful tx by ID", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendUnsuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const result = await client.searchTx({ id: sendUnsuccessful.hash });
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(jasmine.objectContaining({
                height: sendUnsuccessful.height,
                hash: sendUnsuccessful.hash,
                code: 5,
                tx: sendUnsuccessful.tx,
            }));
        });
        it("can search by ID (non existent)", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const nonExistentId = "0000000000000000000000000000000000000000000000000000000000000000";
            const result = await client.searchTx({ id: nonExistentId });
            expect(result.length).toEqual(0);
        });
        it("can search by ID and filter by minHeight", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful);
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const query = { id: sendSuccessful.hash };
            {
                const result = await client.searchTx(query, { minHeight: 0 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height - 1 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height + 1 });
                expect(result.length).toEqual(0);
            }
        });
    });
    describe("with SearchByHeightQuery", () => {
        it("can search successful tx by height", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const result = await client.searchTx({ height: sendSuccessful.height });
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(jasmine.objectContaining({
                height: sendSuccessful.height,
                hash: sendSuccessful.hash,
                code: 0,
                tx: sendSuccessful.tx,
            }));
        });
        it("can search unsuccessful tx by height", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendUnsuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const result = await client.searchTx({ height: sendUnsuccessful.height });
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(jasmine.objectContaining({
                height: sendUnsuccessful.height,
                hash: sendUnsuccessful.hash,
                code: 5,
                tx: sendUnsuccessful.tx,
            }));
        });
    });
    describe("with SearchBySentFromOrToQuery", () => {
        it("can search by sender", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const results = await client.searchTx({ sentFromOrTo: sendSuccessful.sender });
            expect(results.length).toBeGreaterThanOrEqual(1);
            // Check basic structure of all results
            for (const result of results) {
                const containsMsgWithSender = !!result.tx.value.msg.find((msg) => types_1.isMsgSend(msg) && msg.value.from_address == sendSuccessful.sender);
                const containsMsgWithRecipient = !!result.tx.value.msg.find((msg) => types_1.isMsgSend(msg) && msg.value.to_address === sendSuccessful.sender);
                expect(containsMsgWithSender || containsMsgWithRecipient).toEqual(true);
            }
            // Check details of most recent result
            expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                height: sendSuccessful.height,
                hash: sendSuccessful.hash,
                tx: sendSuccessful.tx,
            }));
        });
        it("can search by recipient", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const results = await client.searchTx({ sentFromOrTo: sendSuccessful.recipient });
            expect(results.length).toBeGreaterThanOrEqual(1);
            // Check basic structure of all results
            for (const result of results) {
                const msg = testutils_spec_1.fromOneElementArray(result.tx.value.msg);
                utils_1.assert(types_1.isMsgSend(msg), `${result.hash} (height ${result.height}) is not a bank send transaction`);
                expect(msg.value.to_address === sendSuccessful.recipient ||
                    msg.value.from_address == sendSuccessful.recipient).toEqual(true);
            }
            // Check details of most recent result
            expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                height: sendSuccessful.height,
                hash: sendSuccessful.hash,
                tx: sendSuccessful.tx,
            }));
        });
        it("can search by recipient and filter by minHeight", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful);
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const query = { sentFromOrTo: sendSuccessful.recipient };
            {
                const result = await client.searchTx(query, { minHeight: 0 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height - 1 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { minHeight: sendSuccessful.height + 1 });
                expect(result.length).toEqual(0);
            }
        });
        it("can search by recipient and filter by maxHeight", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful);
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const query = { sentFromOrTo: sendSuccessful.recipient };
            {
                const result = await client.searchTx(query, { maxHeight: 9999999999999 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { maxHeight: sendSuccessful.height + 1 });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { maxHeight: sendSuccessful.height });
                expect(result.length).toEqual(1);
            }
            {
                const result = await client.searchTx(query, { maxHeight: sendSuccessful.height - 1 });
                expect(result.length).toEqual(0);
            }
        });
    });
    describe("with SearchByTagsQuery", () => {
        it("can search by transfer.recipient", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(sendSuccessful, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const results = await client.searchTx({
                tags: [{ key: "transfer.recipient", value: sendSuccessful.recipient }],
            });
            expect(results.length).toBeGreaterThanOrEqual(1);
            // Check basic structure of all results
            for (const result of results) {
                const msg = testutils_spec_1.fromOneElementArray(result.tx.value.msg);
                utils_1.assert(types_1.isMsgSend(msg), `${result.hash} (height ${result.height}) is not a bank send transaction`);
                expect(msg.value.to_address).toEqual(sendSuccessful.recipient);
            }
            // Check details of most recent result
            expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                height: sendSuccessful.height,
                hash: sendSuccessful.hash,
                tx: sendSuccessful.tx,
            }));
        });
        it("can search by message.contract_address", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(postedExecute, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const results = await client.searchTx({
                tags: [{ key: "message.contract_address", value: postedExecute.contract }],
            });
            expect(results.length).toBeGreaterThanOrEqual(1);
            // Check basic structure of all results
            for (const result of results) {
                const msg = testutils_spec_1.fromOneElementArray(result.tx.value.msg);
                utils_1.assert(types_1.isMsgExecuteContract(msg) || types_1.isMsgInstantiateContract(msg), `${result.hash} (at ${result.height}) not an execute or instantiate msg`);
            }
            // Check that the first result is the instantiation
            const first = testutils_spec_1.fromOneElementArray(results[0].tx.value.msg);
            utils_1.assert(types_1.isMsgInstantiateContract(first), "First contract search result must be an instantiation");
            expect(first).toEqual({
                type: "wasm/MsgInstantiateContract",
                value: {
                    sender: testutils_spec_1.faucet.address,
                    code_id: testutils_spec_1.deployedErc20.codeId.toString(),
                    label: "HASH",
                    callback_code_hash: "",
                    init_msg: jasmine.objectContaining({ symbol: "HASH" }),
                    init_funds: [],
                    callback_sig: null,
                },
            });
            // Check details of most recent result
            expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                height: postedExecute.height,
                hash: postedExecute.hash,
                tx: postedExecute.tx,
            }));
        });
        it("can search by message.contract_address + message.action", async () => {
            testutils_spec_1.pendingWithoutWasmd();
            utils_1.assert(postedExecute, "value must be set in beforeAll()");
            const client = new cosmwasmclient_1.CosmWasmClient(testutils_spec_1.wasmd.endpoint);
            const results = await client.searchTx({
                tags: [
                    { key: "message.contract_address", value: postedExecute.contract },
                    { key: "message.action", value: "execute" },
                ],
            });
            expect(results.length).toBeGreaterThanOrEqual(1);
            // Check basic structure of all results
            for (const result of results) {
                const msg = testutils_spec_1.fromOneElementArray(result.tx.value.msg);
                utils_1.assert(types_1.isMsgExecuteContract(msg), `${result.hash} (at ${result.height}) not an execute msg`);
                expect(msg.value.contract).toEqual(postedExecute.contract);
            }
            // Check details of most recent result
            expect(results[results.length - 1]).toEqual(jasmine.objectContaining({
                height: postedExecute.height,
                hash: postedExecute.hash,
                tx: postedExecute.tx,
            }));
        });
    });
});
//# sourceMappingURL=cosmwasmclient.searchtx.spec.js.map