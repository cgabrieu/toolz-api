import ConflictError from '@errors/ConflictError';
import Users from './UsersEntity';

export async function createUser(body: Users) {
  const user = await Users.getUserByEmail(body.email);
  if (user) {
    throw new ConflictError('E-mail já cadastrado');
  }

  const newUser = await Users.createUser(body);
  return newUser;
}
