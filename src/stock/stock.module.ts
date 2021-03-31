import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { StockGateway } from './stock.gateway';
import { IStockServiceProvider } from './primary-ports/stock.service.interface';

@Module({
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
})
export class StockModule {}
