import express from 'express';
import cors from 'cors';
import morgan from 'morgan-body';
import 'express-async-errors';
import 'reflect-metadata';

import router from '@/routes';
import connectDatabase from '@/config/database';
import loggerMiddleware from './middlewares/loggerMiddleware';
import errorHandlingMiddleware from '@/middlewares/errorHandlingMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

morgan(app, {
  noColors: true,
  prettify: false,
  logReqUserAgent: false,
  stream: {
    write: (msg: string) => loggerMiddleware.info(msg) as any,
  },
});

app.get('/health', (_req, res) => {
  res.send('OK!');
});

app.use(router);
app.use(errorHandlingMiddleware);

export async function init() {
  await connectDatabase();
}

export default app;
