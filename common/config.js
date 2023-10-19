import { config } from 'dotenv';
config();

const CONFIG = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  REDIS_DB_URL: process.env.REDIS_DB_URL,
  CRYPTO_SECRET: process.env.CRYPTO_SECRET,
}

export { CONFIG }