import User from '../../src/apps/Users/UserEntity';
import UserBody from '../../src/apps/Users/interfaces/UserBody';
import faker from '@faker-js/faker';

export default async function createUser(): Promise<User> {
  const body: UserBody = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(10),
  };

  return User.createUser(body);
}
