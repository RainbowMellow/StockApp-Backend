import { Module } from '@nestjs/common';
import { StockGateway } from './stock/stock.gateway';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [StockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
