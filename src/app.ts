import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import { ErrorHandler } from 'express-handler-errors';
import morgan from 'morgan-body';

import logger from '@middlewares/loggerMiddleware';
import router from '@routers/index';

import 'reflect-metadata';
import errorHandlingMiddleware from '@middlewares/errorHandlingMiddleware';

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.errorHandle();
  }

  private routes(): void {
    this.app.use('/', router);
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(errorHandlingMiddleware);

    morgan(this.app, {
      noColors: true,
      prettify: false,
      logReqUserAgent: false,
      stream: {
        write: (msg: string) => logger.info(msg) as any,
      },
    });
  }

  private errorHandle(): void {
    this.app.use(
      (err: Error, _req: Request, res: Response, next: NextFunction) => {
        new ErrorHandler().handle(err, res, next, logger as any);
      }
    );
  }
}

export default new App();
