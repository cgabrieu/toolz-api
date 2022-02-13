import jwt from 'jsonwebtoken';

import User from '../../src/apps/Users/UserEntity';
import Session from '../../src/apps/Sessions/SessionEntity';
import * as sessionService from '../../src/apps/Sessions/SessionService';
import UserBody from '../../src/apps/Users/interfaces/UserBody';
import SessionBody from '../../src/apps/Sessions/interfaces/SessionBody';
import NotFoundError from '../../src/errors/NotFoundError';

const sut = sessionService;

const mockUserRepository = {
  findByEmailAndPassword: (f: (email: string)=> Promise<User | null>) =>
    jest.spyOn(User, 'findByEmailAndPassword').mockImplementationOnce(f),
};

const mockSessionRepository = {
  createSession: (f: (user: User, token: string)=> Promise<Session | null>) =>
    jest.spyOn(Session, 'createSession').mockImplementationOnce(f),
  deleteSession: (f: (token: string)=> Promise<void>) =>
    jest.spyOn(Session, 'deleteSession').mockImplementationOnce(f),
};

describe('Unit tests - SessionService', () => {
  const mockCreateSessionBody: UserBody = {
    email: 'test@test.com',
    password: 'valid-password',
  };

  const mockUserResponse = {
    id: 1,
    name: 'test-name',
    email: 'test@test.com',
    password: 'hashed-password',
  } as User;

  const mockSessionResponse: SessionBody = {
    user: {
      name: 'Test',
      email: 'test@test.com',
    },
    token: 'valid-token',
  };

  const mockSession = {
    id: 1,
    user: {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      password: 'hashed-password',
    },
    token: 'valid-token',
    getSession: () => mockSessionResponse,
  } as Session;

  describe('createSession function', () => {
    it('should return a session when user exists', async() => {
      mockUserRepository.findByEmailAndPassword(async() => mockUserResponse);

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'valid-token');

      mockSessionRepository.createSession(async() => mockSession);

      const result = await sut.createSession(mockCreateSessionBody);
      expect(result).toEqual(mockSessionResponse);
    });

    it('should throw a not found error when no user is found', async() => {
      mockUserRepository.findByEmailAndPassword(async() => null);

      const result = sut.createSession(mockCreateSessionBody);
      await expect(result).rejects.toThrowError(NotFoundError);
    });
  });

  describe('deleteSession function', () => {
    it('should return void and delete session', async() => {
      mockSessionRepository.deleteSession(async() => null);

      const result = await sut.deleteSession(mockSession.token);
      expect(result).toBeUndefined();
    });
  });
});
