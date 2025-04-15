import { ConflictException } from '@nestjs/common';
import { AuthRegisterFacade } from 'src/context/auth/application/auth-register.facade';
import { UserRepository } from 'src/context/auth/domain/contracts/user-repository';

describe('AuthRegisterFacade', () => {
  let service: AuthRegisterFacade;

  const mockUserRepository: Partial<UserRepository> = {
    createUser: jest.fn(),
    findByUsername: jest.fn(),
  };

  beforeEach(() => {
    service = new AuthRegisterFacade(mockUserRepository as UserRepository);
    jest.clearAllMocks();
  });

  it('should hash password and create user if not exists', async () => {
    const username = 'newUser';
    const password = 'password';
    (mockUserRepository.findByUsername as jest.Mock).mockResolvedValue(null);
    const spy = jest.spyOn(require('bcrypt'), 'hash');
    await service.run(username, password);

    expect(spy).toHaveBeenCalledWith(password, 10);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(username, expect.any(String));

    const usedHash = (mockUserRepository.createUser as jest.Mock).mock.calls[0][1];
    expect(usedHash).not.toBe(password);
  });

  it('should throw ConflictException if user already exists', async () => {
    const username = 'existingUser';
    const password = 'password';

    (mockUserRepository.findByUsername as jest.Mock).mockResolvedValue({ username });
    await expect(service.run(username, password)).rejects.toThrow(ConflictException);
    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });
});
