export interface PriceRateTransform {
  [key: string]: {
    currency: string;
    price: string;
    timestamp: string;
  };
}