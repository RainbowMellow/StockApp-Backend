import { Stock } from '../stock.model';

export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  getStocks(): Stock[];

  increaseAmount(stock: Stock): Stock;

  decreaseAmount(stock: Stock): Stock;

  addStocks(): void;

  editStock(stock: Stock): void;

  deleteStock(stock: Stock): void;
}
