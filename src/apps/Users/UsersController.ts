import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as UsersService from './UsersService';

export async function create(req: Request, res: Response): Promise<Response> {
  const response = await UsersService.createUser(req.body);

  return res.status(httpStatus.CREATED).send(response);
}
