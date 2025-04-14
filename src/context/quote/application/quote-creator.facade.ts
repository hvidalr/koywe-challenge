import { Injectable, Inject } from '@nestjs/common';
import { ExchangeRateRepository } from '../domain/contracts/exchange-rate-repository';
import { QuotePersistRepository } from '../domain/contracts/quote-perist-repository';
import { Quote } from '../domain/class/quote';

@Injectable()
export class QuoteCreatorFacade {
  constructor(
    @Inject('ExchangeRateRepository')
    private readonly exchangeRateRepository: ExchangeRateRepository,
    @Inject('QuotePersistRepository')
    private readonly quotePersistRepository: QuotePersistRepository,
  ) {}

  async run(from: string, to: string, amount: number): Promise<Quote> {
    const rate = await this.exchangeRateRepository.getRate(from, to);
    return await this.quotePersistRepository.save(from, to, amount, rate, amount * rate);
  }
}
