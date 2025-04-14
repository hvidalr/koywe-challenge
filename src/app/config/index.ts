import 'dotenv/config';

const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  ENVIRONMENT: env('ENVIRONMENT') ?? 'DEVELOP',
  DATABASE: {
    CONNECTION: env('MONGO_CONNECTION') ?? 'mongodb://localhost:27017/koywe-challenge',
  },
  QUOTE: {
    DATA_TTL: env('QUOTE_DATA_TTL') ?? '300',
  },
  ACCESS_TOKEN: {
    JWT: env('ACCESS_TOKEN_JWT') ?? 'secret-access-token-key',
    EXPIRES_IN: env('ACCESS_TOKEN_EXPIRES_IN') ?? '24h'
  }
};
