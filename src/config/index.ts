import { config } from 'dotenv';

const envfile = `.env.${process.env.NODE_ENV}`;
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwtToken: process.env.JWT_SECRET
};

export const postgresConnection = {
  url: process.env.DATABASE_URL,
};
