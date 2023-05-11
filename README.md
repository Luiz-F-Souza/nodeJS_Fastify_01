

### Tecnologias utilizadas:
- NodeJS
- TypeScript
- Fastify
  - Fastify/Cookie
- Knex (QUERY BUILDER)
  - Driver: sqlite3
- dotenv
- zod
- vitest
- supertest (serve para fazer requisições de teste sem colocar o servidor (app) no ar)
- tsup (build for typescript)


### Instalações & Configurações
- npm init -y
- npm i typescript --save-dev
  - npx tsc --init
- npm install @types/node --save-dev
- npm i fastify
  - npm i @fastify/cookie
- npm i tsx -D (for running automatically the server from .ts)
- npm i eslint -D
  - npm i @rocketseat/eslint-config -D
- npm install knex --save
  - DRIVER: npm install sqlite3 --save
- npm i dotenv
- npm i zod
- npm i vitest -D
- npm i supertest -D
  - npm install --save @types/supertest
- npm i tsup -D