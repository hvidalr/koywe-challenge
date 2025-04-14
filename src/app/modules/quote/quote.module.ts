import { Module } from '@nestjs/common';
import { QuoteCreatorFacade } from 'src/context/quote/application/quote-creator.facade';
import { QuoteController } from 'src/app/controllers/quote.controller';
import { InfrastructureQuoteModule } from 'src/context/quote/infrastructure/infrastructure-quote.module';
import { QuoteGetterFacade } from 'src/context/quote/application/quote-getter.facade';

@Module({
  imports: [InfrastructureQuoteModule],
  controllers: [QuoteController],
  providers: [QuoteGetterFacade],
})
export class QuoteModule {}
