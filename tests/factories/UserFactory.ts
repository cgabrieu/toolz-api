import Users from '../../src/apps/Users/UsersEntity';
import faker from '@faker-js/faker';

export default async function createUser(): Promise<Users> {
  const body = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(10),
  } as Users;

  return Users.createUser(body);
}
