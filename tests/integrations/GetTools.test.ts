import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '../../src/app';
import Session from '../../src/apps/Sessions/SessionEntity';
import User from '../../src/apps/Users/UserEntity';
import ToolBody from '../../src/apps/Tools/interfaces/ToolBody';
import createSession from '../factories/SessionFactory';
import createUser from '../factories/UserFactory';
import { clearDatabase } from '../utils/clearRepositories';
import closeConnection from '../utils/closeConnection';

let user: User;
let session: Session;

beforeAll(async() => {
  await init();
  await clearDatabase();

  user = await createUser();
  session = await createSession(user);
});

afterAll(async() => {
  await clearDatabase();
  await closeConnection();
});

describe('POST TOOLS - Create Tool', () => {
  const routeTools = '/tools';

  const createToolBody: ToolBody = {
    title: faker.random.word().toLowerCase(),
    link: faker.internet.url(),
    description: faker.random.words(),
    tags: ['one', 'two'],
  };

  it('should return 400 (bad request) when link is invalid', async() => {
    const response = await supertest(app)
      .post(routeTools)
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        ...createToolBody,
        link: '',
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when description is invalid', async() => {
    const response = await supertest(app)
      .post(routeTools)
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        ...createToolBody,
        description: '',
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when tags is invalid', async() => {
    const response = await supertest(app)
      .post(routeTools)
      .set('Authorization', `Bearer ${session.token}`)
      .send({
        ...createToolBody,
        tags: ['', '', ''],
      });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 401 (unauthorized) when token is invalid', async() => {
    const response = await supertest(app)
      .post(routeTools)
      .set('Authorization', `Bearer ${session.token}WRONG`)
      .send(createToolBody);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return 201 (created) when all inputs are valid', async() => {
    const response = await supertest(app)
      .post(routeTools)
      .set('Authorization', `Bearer ${session.token}`)
      .send(createToolBody);

    expect(response.body).toEqual({
      id: expect.any(Number),
      userId: user.id,
      ...createToolBody
    });
    expect(response.status).toBe(httpStatus.CREATED);
  });
});
