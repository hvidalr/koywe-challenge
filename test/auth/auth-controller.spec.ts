import { Test } from '@nestjs/testing';
import { AuthController } from 'src/app/controllers/auth.controller';
import { AuthLoginFacade } from 'src/context/auth/application/auth-login.facade';
import { AuthRegisterFacade } from 'src/context/auth/application/auth-register.facade';

describe('AuthController', () => {
  let controller: AuthController;
  const loginFacade = { run: jest.fn() };
  const registerFacade = { run: jest.fn() };
  const mockToken = 'mocked_token';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthLoginFacade, useValue: loginFacade },
        { provide: AuthRegisterFacade, useValue: registerFacade },
      ],
    }).compile();

    controller = module.get(AuthController);
    jest.clearAllMocks();
  });

  it('[POST] /auth/login - should call loginFacade.run with username and password', async () => {
    const mockResult = { access_token: mockToken };
    const username = 'username'
    const password = 'password'
    loginFacade.run.mockResolvedValue(mockResult);

    const result = await controller.login({ username, password });

    expect(loginFacade.run).toHaveBeenCalledWith(username, password);
    expect(result).toEqual(mockResult);
  });

  it('[POST] /auth/register - should call registerFacade.run with username and password', async () => {
    const username = 'newuser'
    const password = 'password'
    registerFacade.run.mockResolvedValue(undefined);

    const result = await controller.register({ username, password });

    expect(registerFacade.run).toHaveBeenCalledWith(username, password);
    expect(result).toBeUndefined();
  });
});
