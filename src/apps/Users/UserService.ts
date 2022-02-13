import ConflictError from '../../errors/ConflictError';
import UserBody from './interfaces/UserBody';
import User from './UserEntity';

export async function createUser(body: UserBody) {
  const user = await User.getUserByEmail(body.email);
  if (user) {
    throw new ConflictError('E-mail já cadastrado');
  }

  const newUser = await User.createUser(body);
  return newUser;
}
