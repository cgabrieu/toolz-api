import { NextFunction, Request, Response } from 'express';

import yup from '@/config/yup';

export async function validateCreateToolPayload(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  await yup
    .object()
    .shape({
      title: yup.string().required(),
      link: yup.string().url().required(),
      description: yup.string().min(5).required(),
      tags: yup.array(yup.string()).min(1).required()
    })
    .validate(req.body, { abortEarly: false });

  return next();
}
