import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoMktRepository } from './repository/crypto-mkt.repository';
import { QuoteSchema } from './repository/interfaces/quote-schema';
import { QuoteStorageMongoRepository } from './repository/quote-storage-mongo.repository';
import { QuoteCreatorFacade } from '../application/quote-creator.facade';
import { QuoteGetterFacade } from '../application/quote-getter.facade';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'quotes', schema: QuoteSchema }]),
  ],
  providers: [
    QuoteGetterFacade,
  ],
  exports: [
    QuoteGetterFacade,
  ],
})

export class InfrastructureQuoteModule {}
