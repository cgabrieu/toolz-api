import { NextFunction, Request, Response } from 'express';

import yup from '@config/yup';

export async function validateCreateUserPayload(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  await yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    })
    .validate(req.body, { abortEarly: false });

  return next();
}
