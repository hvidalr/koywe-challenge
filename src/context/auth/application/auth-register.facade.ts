import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserRepository } from '../domain/contracts/user-repository';

@Injectable()
export class AuthRegisterFacade {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async run(username: string, password: string): Promise<void> {
    const existing = await this.userRepository.findByUsername(username);
    if (existing) throw new ConflictException('Username already exists');

    const hashedPassword = await hash(password, 10);
    await this.userRepository.createUser(username, hashedPassword);
  }
}
