import { env } from './env'
import { knex as setupKnex, Knex } from 'knex'

// the docs says that if we use pg we pass the string directly, if its sqlite we pass an object with 'filename' prop..
const connection =
  env.DATABASE_CLIENT === 'pg'
    ? env.DATABASE_URL
    : {
        filename: env.DATABASE_URL,
      }

export const knexConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(knexConfig)
