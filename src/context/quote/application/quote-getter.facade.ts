import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ExchangeRateRepository } from '../domain/contracts/exchange-rate-repository';
import { QuotePersistRepository } from '../domain/contracts/quote-perist-repository';
import { Quote } from '../domain/class/quote';

@Injectable()
export class QuoteGetterFacade {
  constructor(
    @Inject('QuotePersistRepository')
    private readonly quotePersistRepository: QuotePersistRepository,
  ) {}

  async run(id: string): Promise<Quote> {
    const quote = await this.quotePersistRepository.findById(id);
    if (!quote) throw new NotFoundException(`Quote with id ${id} not found`);

    return quote;
  }
}
