import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '../../src/app';
import User from '../../src/apps/Users/UserEntity';
import createUser from '../factories/UserFactory';
import { clearDatabase } from '../utils/clearRepositories';
import closeConnection from '../utils/closeConnection';

describe('POST USERS - Sign Up', () => {
  let user: User;

  const routeSignUp = '/auth/sign-up';

  beforeAll(async() => {
    await init();
    await clearDatabase();

    user = await createUser();
  });

  afterAll(async() => {
    await clearDatabase();
    await closeConnection();
  });

  it('should return 400 (bad request) when the name field is black', async() => {
    const response = await supertest(app)
      .post(routeSignUp)
      .send({
        name: '',
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when the email is invalid', async() => {
    const response = await supertest(app)
      .post(routeSignUp)
      .send({
        name: faker.name.findName(),
        email: 'test.com',
        password: faker.internet.password(10),
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when the password is invalid', async() => {
    const response = await supertest(app)
      .post(routeSignUp)
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(5),
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 409 (conflict) when there is already a user with the email', async() => {
    const response = await supertest(app)
      .post(routeSignUp)
      .send({
        name: faker.name.findName(),
        email: user.email,
        password: faker.internet.password(6),
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it('should return 201 (created) when the payload is valid', async() => {
    const body: { name: string; email: string; password: string } = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    const response = await supertest(app).post(routeSignUp).send(body);

    expect(response.body).toEqual({
      id: expect.any(Number),
      name: body.name,
      email: body.email,
    });
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
