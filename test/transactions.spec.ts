import { app } from '../src/app'
import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import supertest from 'supertest'

// Categorizando com describe()
describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  // it() and test() do the same
  it('should be able to create a new transaction', async () => {
    const response = await supertest(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  it.todo('should be able to list all transactions')

  it('should be able to see the transactions with its sessionId', async () => {
    const responseCreatingNewTransaction = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const sessionIdCookie = responseCreatingNewTransaction.get('Set-Cookie')

    const responseCreatedTransactionBody = (
      await supertest(app.server)
        .get('/transactions')
        .set('Cookie', sessionIdCookie)
    ).body

    const newTransactionId = responseCreatedTransactionBody.transactions[0].id

    const responseListingPrivateTransactions = await supertest(app.server)
      .get(`/transactions/${newTransactionId}`)
      .set('Cookie', sessionIdCookie)

    const privateTransactionsBody =
      responseListingPrivateTransactions.body.transaction

    expect(privateTransactionsBody).toEqual(
      expect.objectContaining({
        id: newTransactionId,
        amount: 5000,
        title: 'New transaction',
      }),
    )
  })
})
