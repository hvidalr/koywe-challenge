import { Quote } from "../class/quote";

export interface QuotePersistRepository {
  findById(id: string): Promise<Quote | null>;
}
