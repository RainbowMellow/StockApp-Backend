import { Injectable } from '@nestjs/common';
import { IStockService } from '../primary-ports/stock.service.interface';
import { Stock } from '../stock.model';

@Injectable()
export class StockService implements IStockService {
  stocks: Stock[] = [];

  addStocks(): void {
    this.stocks.push(
      {
        id: 1,
        value: 768.08,
        name: 'Apple',
        dayStartValue: 768.08,
        startValueDate: new Date(),
        description:
          'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. ' +
          'It also sells various related services.',
      },
      {
        id: 2,
        value: 455.16,
        name: 'Samsung',
        dayStartValue: 455.16,
        startValueDate: new Date(),
        description:
          'Samsung Electronics Co Ltd is Korea-based company principally engaged in the manufacture and distribution of electronic products.',
      },
      {
        id: 3,
        value: 1141.22,
        name: 'Gamestop',
        dayStartValue: 1141.22,
        startValueDate: new Date(),
        description:
          'GameStop Corp., a specialty retailer, provides games and entertainment products through its e-commerce properties and various stores in the United States, Canada, Australia, and Europe. ',
      },
      {
        id: 4,
        value: 3868.49,
        name: 'Tesla',
        dayStartValue: 3868.49,
        startValueDate: new Date(),
        description:
          'Founded in 2003 and based in Palo Alto, California, Tesla is a vertically integrated sustainable energy company that also aims to transition the world to electric mobility by making electric vehicles.',
      },
    );
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  increaseAmount(stock: Stock): Stock {
    const editStock = this.stocks.find((s) => s.id === stock.id);
    editStock.value++;
    return editStock;
  }

  decreaseAmount(stock: Stock): Stock {
    const editStock = this.stocks.find((s) => s.id === stock.id);
    editStock.value--;
    return editStock;
  }

  deleteStock(stock: Stock): Stock[] {
    this.stocks = this.stocks.filter((s) => s.id !== stock.id);
    return this.stocks;
  }

  editStock(stock: Stock): Stock[] {
    const currentStock = this.stocks.find((s) => s.id === stock.id);
    currentStock.name = stock.name;
    currentStock.description = stock.description;
    currentStock.value = stock.value;
    currentStock.startValueDate = stock.startValueDate;
    currentStock.dayStartValue = stock.dayStartValue;
    return this.stocks;
  }
}
