import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as ToolService from './ToolService';

export async function createTool(req: Request, res: Response): Promise<Response> {
  const response = await ToolService.createTool(req.body, req.userId);

  return res.status(httpStatus.CREATED).send(response);
}

export async function getTools(req: Request, res: Response): Promise<Response> {
  const response = await ToolService.getTools();

  return res.status(httpStatus.OK).send(response);
}

export async function deleteTool(req: Request, res: Response): Promise<Response> {
  await ToolService.deleteToolById(Number(req.params.id), req.userId);

  return res.sendStatus(httpStatus.OK);
}
