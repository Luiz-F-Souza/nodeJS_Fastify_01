"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const vitest_1 = require("vitest");
const node_child_process_1 = require("node:child_process");
const supertest_1 = __importDefault(require("supertest"));
// Categorizando com describe()
(0, vitest_1.describe)('Transactions routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.beforeEach)(async () => {
        (0, node_child_process_1.execSync)('npm run knex -- migrate:rollback --all');
        (0, node_child_process_1.execSync)('npm run knex -- migrate:latest');
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    // it() and test() do the same
    (0, vitest_1.it)('should be able to create a new transaction', async () => {
        const response = await (0, supertest_1.default)(app_1.app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(201);
    });
    vitest_1.it.todo('should be able to list all transactions');
    (0, vitest_1.it)('should be able to see the transactions with its sessionId', async () => {
        const responseCreatingNewTransaction = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        });
        const sessionIdCookie = responseCreatingNewTransaction.get('Set-Cookie');
        const responseCreatedTransactionBody = (await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', sessionIdCookie)).body;
        const newTransactionId = responseCreatedTransactionBody.transactions[0].id;
        const responseListingPrivateTransactions = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${newTransactionId}`)
            .set('Cookie', sessionIdCookie);
        const privateTransactionsBody = responseListingPrivateTransactions.body.transaction;
        (0, vitest_1.expect)(privateTransactionsBody).toEqual(vitest_1.expect.objectContaining({
            id: newTransactionId,
            amount: 5000,
            title: 'New transaction',
        }));
    });
});
