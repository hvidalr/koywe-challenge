import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QuoteCreatorFacade } from 'src/context/quote/application/quote-creator.facade';
import { ConvertCurrencyDto } from '../middlewares/dto/convert-currency.dto';
import { QuoteGetterFacade } from 'src/context/quote/application/quote-getter.facade';
import { Quote } from 'src/context/quote/domain/class/quote';

@ApiTags('Quote')
@Controller('quote')
export class QuoteController {
  constructor(
    private readonly quoteCreatorFacade: QuoteCreatorFacade,
    private readonly quoteGetterFacade: QuoteGetterFacade,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createQuote(@Body() {from, to, amount}: ConvertCurrencyDto): Promise<Quote> {
    return this.quoteCreatorFacade.run(from, to, amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getQuote(@Param('id') id: string): Promise<Quote> {
    return this.quoteGetterFacade.run(id);
  }
}
