import dotenv from 'dotenv';

// dotenv will load the .env* files environment variables on runtime, into process.env
dotenv.config();

export const { APP_PORT } = process.env;
