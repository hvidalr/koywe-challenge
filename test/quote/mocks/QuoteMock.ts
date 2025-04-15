import { Quote } from "src/context/quote/domain/class/quote";

export class QuoteMock {
  static generate(): Quote {
    return new Quote(
      'abc123',
      'EUR',
      'ARS',
      50,
      1200,
      60000,
      new Date().toISOString(),
      new Date(Date.now() + 300000).toISOString()
    );
  }
}