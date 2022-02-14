import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import httpStatus from 'http-status';

import ConflictError from '@/errors/ConflictError';
import UnauthorizedError from '@/errors/UnauthorizedError';
import NotFoundError from '@/errors/NotFoundError';
import loggerMiddleware from './loggerMiddleware';
import NoContentError from '@/errors/NoContentError';

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

  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof NoContentError) {
    return res.status(httpStatus.NO_CONTENT).send({
      message: err.message,
    });
  }

  loggerMiddleware.info(String(err));
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error!',
  });
}
