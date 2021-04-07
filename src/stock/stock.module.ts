import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { StockGateway } from './stock.gateway';
import { IStockServiceProvider } from './primary-ports/stock.service.interface';
import { databaseProviders } from './infrastructure/database.providers';
import { stockProviders } from './infrastructure/stock.providers';
import { DatabaseModule } from './infrastructure/database.module';
import { StockRepository } from './infrastructure/stock.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
    StockRepository,
    ...stockProviders,
  ],
})
export class StockModule {}
