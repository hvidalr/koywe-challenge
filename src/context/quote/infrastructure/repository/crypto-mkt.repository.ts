import axios from 'axios';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ExchangeRateRepository } from '../../domain/contracts/exchange-rate-repository';
import { PriceRateTransform } from './interfaces/crypto-mkt-responses';
import config from './config';

@Injectable()
export class CryptoMktRepository implements ExchangeRateRepository {
  private readonly logger = new Logger(CryptoMktRepository.name);

  async getRate(from: string, to: string): Promise<number> {
    const key = `${from}_${to}`.toUpperCase();

    try {
      const response = await axios.get<PriceRateTransform>(config.CRYPTO_MKT_PRICE_RATE(from, to));
      const rate = response?.data?.[from]?.price;
      if (!rate) throw new BadRequestException('Invalid response');
      return parseFloat(rate);
    } catch (err) {
      this.logger.warn(`External API failed for ${key}, using fallback rate. Reason: ${err.message}`);
      throw new BadRequestException(`Exchange rate not available for ${from} to ${to}`);
    }
  }
}
