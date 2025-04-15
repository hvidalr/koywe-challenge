import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from 'src/app/controllers/quote.controller';
import { QuoteCreatorFacade } from 'src/context/quote/application/quote-creator.facade';
import { QuoteGetterFacade } from 'src/context/quote/application/quote-getter.facade';
import { QuoteMock } from './mocks/QuoteMock';

describe('QuoteController', () => {
  let controller: QuoteController;
  let quoteCreatorFacade: QuoteCreatorFacade;
  let quoteGetterFacade: QuoteGetterFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        { provide: QuoteCreatorFacade, useValue: { run: jest.fn() }},
        { provide: QuoteGetterFacade, useValue: { run: jest.fn() }},
      ],
    }).compile();

    controller = module.get(QuoteController);
    quoteCreatorFacade = module.get(QuoteCreatorFacade);
    quoteGetterFacade = module.get(QuoteGetterFacade);
  });

  describe('createQuote', () => {
    it('[POST] /quote - should call quoteCreatorFacade.run and return a Quote', async () => {
      const mockQuote = QuoteMock.generate();
      const { from, to, amount } = mockQuote;
      (quoteCreatorFacade.run as jest.Mock).mockResolvedValue(mockQuote);
      const result = await controller.createQuote({from, to, amount});

      expect(quoteCreatorFacade.run).toHaveBeenCalledWith(from, to, amount);
      expect(result).toBe(mockQuote);
    });
  });

  describe('getQuote', () => {
    it('[GET] /quote:id - should call quoteGetterFacade.run and return a Quote', async () => {
      const mockQuote = QuoteMock.generate();
      (quoteGetterFacade.run as jest.Mock).mockResolvedValue(mockQuote);
      const result = await controller.getQuote(mockQuote.id);

      expect(quoteGetterFacade.run).toHaveBeenCalledWith(mockQuote.id);
      expect(result).toBe(mockQuote);
    });
  });
});
