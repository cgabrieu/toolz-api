import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan-body';

import logger from '@middlewares/loggerMiddleware';
import router from './routes';

import 'reflect-metadata';

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();

    this.setupMiddlewares();
    this.routes();
  }

  private routes(): void {
    this.app.use('/', router);
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());

    morgan(this.app, {
      noColors: true,
      prettify: false,
      logReqUserAgent: false,
      stream: {
        write: (msg: string) => logger.info(msg) as any,
      },
    });
  }
}

export default new App();
