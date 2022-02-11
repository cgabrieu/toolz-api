import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import ConflictError from '@errors/ConflictError';

import logger from '@middlewares/loggerMiddleware';

export default function errorHandlingMiddleware(
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ConflictError) {
    console.log('entrou');
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }
  //console.log(err);
  //logger.error(String(err));
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
