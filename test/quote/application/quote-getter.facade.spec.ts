import { NotFoundException } from '@nestjs/common';
import { QuoteGetterFacade } from 'src/context/quote/application/quote-getter.facade';
import { QuotePersistRepository } from 'src/context/quote/domain/contracts/quote-perist-repository';
import { QuoteMock } from '../mocks/QuoteMock';

describe('QuoteGetterFacade', () => {
  let facade: QuoteGetterFacade;
  let mockQuotePersistRepository: jest.Mocked<QuotePersistRepository>;

  beforeEach(() => {
    mockQuotePersistRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };

    facade = new QuoteGetterFacade(mockQuotePersistRepository);
  });

  const mockQuote = QuoteMock.generate();

  it('should return a quote successfully', async () => {
    mockQuotePersistRepository.findById.mockResolvedValue(mockQuote);

    const result = await facade.run('quote-id-123');

    expect(result).toBe(mockQuote);
    expect(mockQuotePersistRepository.findById).toHaveBeenCalledWith('quote-id-123');
  });

  it('should throw NotFoundException if quote does not exist', async () => {
    mockQuotePersistRepository.findById.mockResolvedValue(null);

    await expect(facade.run('nonexistent-id')).rejects.toThrow(NotFoundException);
    expect(mockQuotePersistRepository.findById).toHaveBeenCalledWith('nonexistent-id');
  });
});
