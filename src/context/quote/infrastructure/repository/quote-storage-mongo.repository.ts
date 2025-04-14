import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuotePersistRepository } from '../../domain/contracts/quote-perist-repository';
import { QuoteDocument } from './interfaces/quote-schema';
import { Quote } from '../../domain/class/quote';

@Injectable()
export class QuoteStorageMongoRepository implements QuotePersistRepository {
  constructor(
    @InjectModel('quotes') private readonly quoteModel: Model<QuoteDocument>
  ) {}

  async save(from: string, to: string, amount: number, rate: number, convertedAmount: number): Promise<Quote> {
    const quote = new this.quoteModel({from, to, amount, rate, convertedAmount});
    await quote.save();
    return new Quote(
      quote.id,
      quote.from,
      quote.to,
      quote.amount,
      quote.rate,
      quote.convertedAmount,
      quote.timestamp.toISOString(),
      quote.expiresAt.toISOString()
    )
  }

  async findById(id: string): Promise<Quote | null> {
    const quote = await this.quoteModel.findOne({ id }).lean();
    if (!quote || quote?.expiresAt <= new Date()) return null;

    return new Quote(
      quote.id,
      quote.from,
      quote.to,
      quote.amount,
      quote.rate,
      quote.convertedAmount,
      quote.timestamp.toISOString(),
      quote.expiresAt.toISOString(),
    );
  }
}
