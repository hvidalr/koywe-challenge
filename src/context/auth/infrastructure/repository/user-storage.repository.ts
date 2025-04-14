import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './interfaces/user.schema';
import { UserRepository } from '../../domain/contracts/user-repository';

@Injectable()
export class UserStorageRepository implements UserRepository {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(username: string, hashedPassword: string): Promise<void> {
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
  }
}
