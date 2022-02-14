import User from '../../src/apps/Users/UserEntity';
import UserBody from '../../src/apps/Users/interfaces/UserBody';
import faker from '@faker-js/faker';

export default async function createUser(password?: string): Promise<User> {
  const body: UserBody = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: password || faker.internet.password(10)
  };

  return await User.createUser(body);
}
