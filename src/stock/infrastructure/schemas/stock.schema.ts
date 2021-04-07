import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
  name: String,
  value: Number,
  dayStartValue: Number,
  startValueDate: Date,
  description: String,
});
