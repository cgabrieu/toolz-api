import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import ConflictError from '@errors/ConflictError';

import logger from '@middlewares/loggerMiddleware';

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(String(err));

  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
