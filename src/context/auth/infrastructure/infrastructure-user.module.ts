import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStorageRepository } from './repository/user-storage.repository';
import { UserSchema } from './repository/interfaces/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserStorageRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class InfrastructureUserModule {}
