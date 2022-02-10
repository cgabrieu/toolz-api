import ConflictError from '@errors/ConflictError';
import Users from './UsersEntity';

async function createUser(name: string, email: string, password: string) {
  const user = await Users.getUserByEmail(email);
  if (user) {
    throw new ConflictError('E-mail já cadastrado');
  }
  const newUser = await Users.createUser(name, email, password);
  return newUser;
}
