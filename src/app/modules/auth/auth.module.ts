import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'src/app/config';
import { AuthController } from 'src/app/controllers/auth.controller';
import { JwtStrategy } from 'src/app/middlewares/auth/jwt.strategy';
import { AuthService } from 'src/context/auth/application/auth.service';
import { InfrastructureUserModule } from 'src/context/auth/infrastructure/infrastructure-user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.ACCESS_TOKEN.JWT,
      signOptions: { expiresIn: config.ACCESS_TOKEN.EXPIRES_IN },
    }),
    InfrastructureUserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
