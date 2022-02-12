import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as UserService from './UserService';
import * as SessionService from '../Session/SessionService';

export async function create(req: Request, res: Response): Promise<Response> {
  const response = await UserService.createUser(req.body);

  return res.status(httpStatus.CREATED).send(response);
}

export async function get(req: Request, res: Response): Promise<Response> {
  const response = await SessionService.createSession(req.body);

  return res.status(httpStatus.OK).send(response);
}
