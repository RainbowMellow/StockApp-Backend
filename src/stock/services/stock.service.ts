import { Inject, Injectable } from '@nestjs/common';
import { IStockService } from '../primary-ports/stock.service.interface';
import { Stock } from '../stock.model';
import { StockRepository } from '../infrastructure/stock.repository';

@Injectable()
export class StockService implements IStockService {
  constructor(private stockRepository: StockRepository) {}

  async addStocks(): Promise<void> {
    await this.stockRepository.addStocks();
  }

  async getStocks(): Promise<Stock[]> {
    return await this.stockRepository.getStocks();
  }

  async deleteStock(stock: Stock): Promise<Stock[]> {
    return await this.stockRepository.deleteStock(stock);
  }

  async editStock(stock: Stock): Promise<Stock[]> {
    return await this.stockRepository.editStock(stock);
  }
}
