import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '../../src/app';
import User from '../../src/apps/Users/UserEntity';
import createUser from '../factories/UserFactory';
import { clearDatabase } from '../utils/clearRepositories';
import closeConnection from '../utils/closeConnection';

let user: User;

beforeAll(async() => {
  await init();
  await clearDatabase();

  user = await createUser();
});

afterAll(async() => {
  await clearDatabase();
  await closeConnection();
});

describe('POST USERS - Sign Up', () => {
  const routeSignUp = '/auth/sign-up';

  it('should return 400 (bad request) when name field is blank', async() => {
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

  it('should return 400 (bad request) when email is invalid', async() => {
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

  it('should return 400 (bad request) when password is invalid', async() => {
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

  it('should return 409 (conflict) when there is already a user with email', async() => {
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

  it('should return 201 (created) when payload is valid', async() => {
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

describe('POST USERS - Sign In', () => {
  const routeSignIn = '/auth/sign-in';

  it('should return 400 (bad request) when email field is blank', async() => {
    const response = await supertest(app)
      .post(routeSignIn)
      .send({
        email: '',
        password: faker.internet.password(10),
      });

    expect(response.body.message).toBe('email é obrigatório');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when password field is blank', async() => {
    const response = await supertest(app).post(routeSignIn).send({
      email: faker.internet.email(),
      password: '',
    });

    expect(response.body.message).toBe('password é obrigatório');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when email is invalid', async() => {
    const response = await supertest(app)
      .post(routeSignIn)
      .send({
        email: 'test.com',
        password: faker.internet.password(10),
      });

    expect(response.body.message).toBe('Email inválido');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 404 (not found) when email and/or password is invalid', async() => {
    const response = await supertest(app)
      .post(routeSignIn)
      .send({
        email: user.email,
        password: faker.internet.password(10),
      });

    expect(response.body.message).toBe('Email e/ou senha inválido(s)');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should return 200 (ok) when email and/or password is invalid', async() => {
    user = await createUser('valid-password');

    const response = await supertest(app)
      .post(routeSignIn)
      .send({
        email: user.email,
        password: 'valid-password'
      });

      expect(response.body).toEqual({
        user: expect.any(Object),
        token: expect.any(String),
      });
    expect(response.status).toBe(httpStatus.OK);
  });
});
