import jwt from 'jsonwebtoken';
import User from '../../src/apps/Users/UserEntity';
import Session from '../../src/apps/Sessions/SessionEntity';

import { server } from '../../src/config';

export default async function createSession(user: User): Promise<Session> {
  const token = jwt.sign({ userId: user.id }, server.jwtToken);

  return await Session.createSession(user, token);
}
