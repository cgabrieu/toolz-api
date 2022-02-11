import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import httpStatus from 'http-status';

import ConflictError from '@/errors/ConflictError';

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
