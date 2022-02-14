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
      title: yup.string().required('Deve possuir um titulo'),
      link: yup.string().url('Link inválido').required('Deve possuir um link'),
      description: yup.string().min(5, 'Deve possuir uma descrição de pelo menos 5 caracteres').required(),
      tags: yup
        .array()
        .of(yup.string().required('Tags deve possuir um array de strings'))
        .min(1, 'Deve possuir pelo menos uma tag')
        .required('Deve possuir tags'),
    })
    .validate(req.body, { abortEarly: true });

  return next();
}
