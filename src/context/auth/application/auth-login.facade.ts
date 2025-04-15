import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserRepository } from '../domain/contracts/user-repository';

@Injectable()
export class AuthLoginFacade {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async run(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await compare(password, user.password)) return {
      access_token: this.jwtService.sign({ username: username, sub: username }, { expiresIn: '24h' })
    };

    throw new UnauthorizedException('Invalid credentials');
  }
}
