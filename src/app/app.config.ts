import dotenv from 'dotenv';

// dotenv will load the .env* files environment variables on runtime, into process.env
dotenv.config();

export const { APP_PORT } = process.env;

export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

export let { PRIVATE_KEY, PUBLIC_KEY } = process.env;

PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString();