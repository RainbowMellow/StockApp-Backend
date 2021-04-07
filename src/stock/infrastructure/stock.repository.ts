import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StockEntity } from './stock.entity';
import { Stock } from '../stock.model';

@Injectable()
export class StockRepository {
  constructor(
    @Inject('STOCK_MODEL')
    private stockModel: Model<StockEntity>,
  ) {}

  async addStocks(): Promise<void> {
    const apple = new this.stockModel({
      id: 1,
      value: 768.08,
      name: 'Apple',
      dayStartValue: 768.08,
      startValueDate: new Date(),
      description:
        'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. ' +
        'It also sells various related services.',
    });

    const ap = await apple.save();
    console.log(ap);

    const samsung = new this.stockModel({
      id: 2,
      value: 455.16,
      name: 'Samsung',
      dayStartValue: 455.16,
      startValueDate: new Date(),
      description:
        'Samsung Electronics Co Ltd is Korea-based company principally engaged in the manufacture and distribution of electronic products.',
    });

    const sm = await samsung.save();
    console.log(sm);

    const gamestop = new this.stockModel({
      id: 3,
      value: 1141.22,
      name: 'Gamestop',
      dayStartValue: 1141.22,
      startValueDate: new Date(),
      description:
        'GameStop Corp., a specialty retailer, provides games and entertainment products through its e-commerce properties and various stores in the United States, Canada, Australia, and Europe. ',
    });

    const gs = await gamestop.save();
    console.log(gs);

    const tesla = new this.stockModel({
      id: 4,
      value: 3868.49,
      name: 'Tesla',
      dayStartValue: 3868.49,
      startValueDate: new Date(),
      description:
        'Founded in 2003 and based in Palo Alto, California, Tesla is a vertically integrated sustainable energy company that also aims to transition the world to electric mobility by making electric vehicles.',
    });

    const ts = await tesla.save();
    console.log(ts);
  }

  async getStocks(): Promise<Stock[]> {
    const stocks = await this.stockModel.find();
    const stocksFromDB: Stock[] = [];

    stocks.forEach((s) =>
      stocksFromDB.push({
        id: s._id,
        name: s.name,
        value: s.value,
        description: s.description,
        dayStartValue: s.dayStartValue,
        startValueDate: s.startValueDate,
      }),
    );

    return stocksFromDB;
  }

  async deleteStock(stock: Stock): Promise<Stock[]> {
    await this.stockModel.findByIdAndDelete(stock.id);
    return this.getStocks();
  }

  async editStock(stock: Stock): Promise<Stock[]> {
    await this.stockModel.findByIdAndUpdate(
      stock.id,
      {
        name: stock.name,
        value: stock.value,
        description: stock.description,
        dayStartValue: stock.dayStartValue,
        startValueDate: stock.startValueDate,
      },
      function (err) {
        if (err) {
          console.log(err);
        }
      },
    );

    return await this.getStocks();
  }
}
