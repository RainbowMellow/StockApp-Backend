import { Stock } from '../stock.model';

export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  getStocks(): Promise<Stock[]>;

  addStocks(): Promise<void>;

  editStock(stock: Stock): Promise<Stock[]>;

  deleteStock(stock: Stock): Promise<Stock[]>;
}
