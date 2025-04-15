import { UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AuthLoginFacade } from 'src/context/auth/application/auth-login.facade';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/context/auth/domain/contracts/user-repository';

describe('AuthLoginFacade', () => {
  let service: AuthLoginFacade;
  const mockedToken = 'mocked_token';
  const mockJwtService: Partial<JwtService> = {
    sign: jest.fn().mockReturnValue(mockedToken),
  };

  const mockUserRepository: Partial<UserRepository> = {
    findByUsername: jest.fn(),
  };

  beforeEach(() => {
    service = new AuthLoginFacade(
      mockJwtService as JwtService,
      mockUserRepository as UserRepository,
    );
    jest.clearAllMocks();
  });

  it('should return token if credentials are valid', async () => {
    const username = 'username';
    const password = 'password';
    const hashed = await hash(password, 10);

    (mockUserRepository.findByUsername as jest.Mock).mockResolvedValue({ username, password: hashed });

    const result = await service.run(username, password);

    expect(mockJwtService.sign).toHaveBeenCalled();
    expect(result).toEqual({ access_token: mockedToken });
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    const username = 'username';
    const password = 'password';
    (mockUserRepository.findByUsername as jest.Mock).mockResolvedValue({ username, password });

    await expect(service.run('user', 'invalid')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    (mockUserRepository.findByUsername as jest.Mock).mockResolvedValue(null);

    await expect(service.run('notAnUser', 'pass')).rejects.toThrow(UnauthorizedException);
  });
});
