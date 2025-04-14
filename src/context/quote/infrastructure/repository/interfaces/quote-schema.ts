import { randomBytes } from 'crypto';
import { Schema, Document } from 'mongoose';
import config from 'src/app/config';

export interface QuoteDocument extends Document {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: Date;
  expiresAt: Date;
}

export const QuoteSchema = new Schema(
  {
    id: {
      type: String,
      default: () => randomBytes(4).toString('hex'),
      unique: true,
      index: true,
    },
    from: String,
    to: String,
    amount: Number,
    rate: Number,
    convertedAmount: Number,
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + parseInt(config.QUOTE.DATA_TTL) * 1000),
      expires: config.QUOTE.DATA_TTL,
    },
  },
  {
    versionKey: false,
  }
);
