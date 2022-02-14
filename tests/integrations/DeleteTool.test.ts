import httpStatus from 'http-status';
import supertest from 'supertest';

import app, { init } from '../../src/app';
import Session from '../../src/apps/Sessions/SessionEntity';
import User from '../../src/apps/Users/UserEntity';
import Tool from '../../src/apps/Tools/ToolEntity';

import createSession from '../factories/SessionFactory';
import createUser from '../factories/UserFactory';
import createTool from '../factories/ToolFactory';

import { clearDatabase } from '../utils/clearRepositories';
import closeConnection from '../utils/closeConnection';

let user: User;
let session: Session;
let tool: Tool;

beforeAll(async() => {
  await init();
  await clearDatabase();

  user = await createUser();
  session = await createSession(user);
  tool = await createTool(user.id);
});

afterAll(async() => {
  await clearDatabase();
  await closeConnection();
});

describe('DELETE TOOL', () => {
  const routeToolDelete = '/tools/';

  it('should return 401 (unauthorized) when header is invalid', async() => {
    const toolId = tool.id;
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${toolId}`)
      .set('Authorization', `Bearer ${session.token}WRONG`);

    expect(response.body.message).toBe('Header de autenticação inválido');
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should return 400 (bad request) when id is zero', async() => {
    const toolId = 0;
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${toolId}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.body.message).toBe('Id da ferramenta inválido');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 400 (bad request) when id is not a number', async() => {
    const toolId = 'TESTE';
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${toolId}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.body.message).toBe('Id da ferramenta inválido');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 404 (not found) when not exist tool', async() => {
    const toolId = 9999999;
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${toolId}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.body.message).toBe(`Ferramenta não encontrada para o id: ${toolId}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should return 403 (forbidden) when iool user id is not equal to header token', async() => {
    user = await createUser();
    session = await createSession(user);
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${tool.id}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.body.message).toBe('Não é possível remover pois não pertence ao usuário');
    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it('should return 200 (ok) when valid inputs and is successfully removed', async() => {
    tool = await createTool(user.id);
    const response = await supertest(app)
      .delete(`${routeToolDelete}/${tool.id}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.body).toEqual({});
    expect(response.status).toBe(httpStatus.OK);
  });
});
