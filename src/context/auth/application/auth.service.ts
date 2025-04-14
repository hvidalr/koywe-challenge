import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserRepository } from '../domain/contracts/user-repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async register(username: string, password: string): Promise<void> {
    const hashedPassword = await hash(password, 10);
    await this.userRepository.createUser(username, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<{username: string} | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await compare(password, user.password)) return { username: user.username };
    return null;
  }

  async login(user: {username: string}) {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
}
