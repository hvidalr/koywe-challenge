export default {
  CRYPTO_MKT_PRICE_RATE: (from: string, to: string) => {
    return `https://api.exchange.cryptomkt.com/api/3/public/price/rate?from=${from}&to=${to}`
  }
}
