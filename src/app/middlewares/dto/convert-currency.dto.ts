import { IsNumber, IsString } from 'class-validator';

export class ConvertCurrencyDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsNumber()
  amount: number;
}
