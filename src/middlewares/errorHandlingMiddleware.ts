import { Request, Response } from 'express';
import httpStatus from 'http-status';

import ConflictError from '@errors/ConflictError';

import logger from '@middlewares/loggerMiddleware';

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response
) {
  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  logger.error(String(err));
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!"
  });
}
