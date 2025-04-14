import { Module } from '@nestjs/common';
import { QuoteModule } from '../modules/quote/quote.module';
import { DatabaseModule } from 'src/context/shared/infrastructure/mongo.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [QuoteModule, AuthModule, DatabaseModule],
})
export class AppModule {}
