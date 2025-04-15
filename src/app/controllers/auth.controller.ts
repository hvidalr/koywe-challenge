import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthLoginFacade } from 'src/context/auth/application/auth-login.facade';
import { LoginDto } from '../middlewares/dto/login.dto copy';
import { AuthRegisterFacade } from 'src/context/auth/application/auth-register.facade';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authLoginFacade: AuthLoginFacade,
    private readonly authRegisterFacade: AuthRegisterFacade,
  ) {}

  @Post('register')
  async register(@Body() { username, password }: LoginDto) {
    return await this.authRegisterFacade.run(username, password);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() { username, password }: LoginDto) {
    return await this.authLoginFacade.run(username, password);
  }
}
