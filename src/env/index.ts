import { config } from 'dotenv'
import { z } from 'zod'

// Em ambiente de teste o vitest seta essa variável com o valor de test..
if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️⚠️⚠️ Invalid environment variable 😭', _env.error.format())

  throw new Error('Invalid environment variable 😭')
}

const env = _env.data

export { env }
