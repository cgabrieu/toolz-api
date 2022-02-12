import User from '../../src/apps/Users/UserEntity';
import * as userService from '../../src/apps/Users/UserService';
import ConflictError from '../../src/errors/ConflictError';

const sut = userService;

describe('Unit tests - UserService', () => {
  const mockUserRepository = {
    getUserByEmail: (f: (email: string)=> Promise<User | null>) => jest.spyOn(User, 'getUserByEmail').mockImplementationOnce(f),
    createUser: (f: (body: User)=> Promise<User | null>) => jest.spyOn(User, 'createUser').mockImplementationOnce(f),
  };

  const mockCreateUserBody = {
    name: 'Test',
    email: 'teste@teste.com',
    password: 'valid-password',
  } as User;

  const mockCreateUserResponse = {
    id: 1,
    name: 'Test',
    email: 'teste@teste.com',
  } as User;

  describe('createUser function', () => {
    it('should return a new user with id', async() => {
      mockUserRepository.getUserByEmail(() => null);
      mockUserRepository.createUser(async() => mockCreateUserResponse);

      const result = await sut.createUser(mockCreateUserBody);
      expect(result).toEqual(mockCreateUserResponse);
    });

    it('should throw a conflict error when email already exists', async() => {
      mockUserRepository.getUserByEmail(async() => mockCreateUserBody);

      const result = sut.createUser(mockCreateUserBody);
      await expect(result).rejects.toThrowError(ConflictError);
    });
  });
});
