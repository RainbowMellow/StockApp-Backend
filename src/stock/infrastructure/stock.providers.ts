import { Connection } from 'mongoose';
import { StockSchema } from './schemas/stock.schema';

export const stockProviders = [
  {
    provide: 'STOCK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('StockEntity', StockSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
