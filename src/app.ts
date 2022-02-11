import 'express-async-errors';
import 'reflect-metadata';

import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan-body';

import errorHandlingMiddleware from '@middlewares/errorHandlingMiddleware';
import logger from '@middlewares/loggerMiddleware';
import swaggerRoutes from './swagger.routes';
import router from './routes';

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();

    this.configSwagger();
    this.middlewares();
    this.routes();
  }

  private routes(): void {
    this.app.use('/', router);
    this.app.use(errorHandlingMiddleware);
  }

  private middlewares(): void {
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

  private async configSwagger(): Promise<void> {
    const swagger = await swaggerRoutes.load();
    this.app.use(swagger);
  }
}

export default new App();
