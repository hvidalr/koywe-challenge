import { QuoteCreatorFacade } from "src/context/quote/application/quote-creator.facade";
import { ExchangeRateRepository } from "src/context/quote/domain/contracts/exchange-rate-repository";
import { QuotePersistRepository } from "src/context/quote/domain/contracts/quote-perist-repository";
import { QuoteMock } from "../mocks/QuoteMock";
import { BadRequestException } from "@nestjs/common";

describe('QuoteCreatorFacade', () => {
  let facade: QuoteCreatorFacade;
  let mockExchangeRateRepository: jest.Mocked<ExchangeRateRepository>;
  let mockQuotePersistRepository: jest.Mocked<QuotePersistRepository>;

  beforeEach(() => {
    mockExchangeRateRepository = { getRate: jest.fn() };
    mockQuotePersistRepository = { save: jest.fn(), findById: jest.fn() };
    facade = new QuoteCreatorFacade(mockExchangeRateRepository, mockQuotePersistRepository);
  });

  it('should create and return a quote successfully', async () => {
    const expectedQuote = QuoteMock.generate();
    const { rate, from, to, amount } = expectedQuote

    mockExchangeRateRepository.getRate.mockResolvedValue(rate);
    mockQuotePersistRepository.save.mockResolvedValue(expectedQuote);

    const result = await facade.run(from, to, amount);

    expect(result).toBe(expectedQuote);
    expect(mockExchangeRateRepository.getRate).toHaveBeenCalledWith(from, to);
    expect(mockQuotePersistRepository.save).toHaveBeenCalledWith(from, to, amount, rate, amount * rate);
  });

  it('should throw BadRequestException if exchange rate is not available', async () => {
    const from = 'FAKE_CURRENCY';
    const to = 'ETH';
    const amount = 100;

    mockExchangeRateRepository.getRate.mockImplementation(() => {
      throw new BadRequestException(`Exchange rate not available for ${from} to ${to}`);
    });

    await expect(facade.run(from, to, amount)).rejects.toThrow(BadRequestException);
    expect(mockExchangeRateRepository.getRate).toHaveBeenCalledWith(from, to);
    expect(mockQuotePersistRepository.save).not.toHaveBeenCalled();
  });

  it('should throw error if saving quote fails - Mongo issue case', async () => {
    const { from, to, amount, rate, convertedAmount } = QuoteMock.generate();

    mockExchangeRateRepository.getRate.mockResolvedValue(rate);
    mockQuotePersistRepository.save.mockImplementation(() => {
      throw new Error('Mongo write failed');
    });

    await expect(facade.run(from, to, amount)).rejects.toThrow('Mongo write failed');
    expect(mockExchangeRateRepository.getRate).toHaveBeenCalledWith(from, to);
    expect(mockQuotePersistRepository.save).toHaveBeenCalledWith(from, to, amount, rate, convertedAmount);
  });
});