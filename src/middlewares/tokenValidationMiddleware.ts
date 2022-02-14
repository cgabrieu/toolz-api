import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import * as sessionService from '@/apps/Sessions/SessionService';
import UnauthorizedError from '@/errors/UnauthorizedError';
import { server } from '@/config';

interface JwtPayload {
  userId: number;
}

export default async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedError(
        'Você precisa enviar um header de autenticação para acessar a rota'
      );
    }

    const { userId } = jwt.verify(token, server.jwtToken) as JwtPayload;

    const session = await sessionService.findSessionByToken(token);
    if (session) {
      req.userId = userId;
      return next();
    }
  } catch {
    throw new UnauthorizedError('Header de autenticação inválido');
  }
}
