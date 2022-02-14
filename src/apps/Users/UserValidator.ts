import { NextFunction, Request, Response } from 'express';

import yup from '@/config/yup';

export async function validateSignUpPayload(
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

export async function validateSignInPayload(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  await yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .validate(req.body, { abortEarly: false });

  return next();
}
