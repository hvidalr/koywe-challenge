import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/context/auth/application/auth.service';
import { LoginDto } from '../middlewares/dto/login.dto copy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: LoginDto) {
    await this.authService.register(body.username, body.password);
    return { message: 'User registered' };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}
