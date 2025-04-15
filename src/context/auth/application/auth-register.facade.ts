import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserRepository } from '../domain/contracts/user-repository';

@Injectable()
export class AuthRegisterFacade {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async run(username: string, password: string): Promise<void> {
    const hashedPassword = await hash(password, 10);
    await this.userRepository.createUser(username, hashedPassword);
  }
}
