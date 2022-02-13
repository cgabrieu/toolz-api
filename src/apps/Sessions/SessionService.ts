import jwt from 'jsonwebtoken';

import { server } from '@/config';
import NotFoundError from '@/errors/NotFoundError';
import User from '../Users/UserEntity';
import Session from './SessionEntity';
import UserBody from '../Users/interfaces/UserBody';

export async function createSession(body: UserBody) {
  const user = await User.findByEmailAndPassword(body.email, body.password);
  if (!user) {
    throw new NotFoundError('Email e/ou senha inválido(s)');
  }

  const token = jwt.sign({ userId: user.id }, server.jwtToken);

  const session = await Session.createSession(user, token);
  return session.getSession();
}

export async function deleteSession(token: string) {
  await Session.deleteSession(token);
}
