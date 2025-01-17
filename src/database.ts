import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  PORT,
  NODE_ENV,
} = process.env

console.log(NODE_ENV)

const client : Pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port : parseInt (PORT as string),
    database: NODE_ENV === 'dev'? POSTGRES_DB:POSTGRES_TEST_DB
})


export default client;
