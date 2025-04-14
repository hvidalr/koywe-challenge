import { Quote } from "../class/quote";

export interface QuotePersistRepository {
  findById(id: string): Promise<Quote | null>;
  save(from: string, to: string, amount: number, rate: number, convertedAmount: number): Promise<Quote>;
}
