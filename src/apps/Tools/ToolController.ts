import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as ToolService from './ToolService';

export async function createTool(req: Request, res: Response): Promise<Response> {
  const response = await ToolService.createTool(req.body);

  return res.status(httpStatus.CREATED).send(response);
}
