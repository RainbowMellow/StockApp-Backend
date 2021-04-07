import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import {
  IStockService,
  IStockServiceProvider,
} from './primary-ports/stock.service.interface';
import { Stock } from './stock.model';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IStockServiceProvider) private stockService: IStockService,
  ) {
    this.stockService.addStocks();
  }

  @WebSocketServer() server;

  @SubscribeMessage('editSave')
  async handleEditSave(@MessageBody() stock: Stock): Promise<void> {
    const stocks = await this.stockService.editStock(stock);
    this.server.emit('editStock', stocks);
  }

  @SubscribeMessage('getStocks')
  async handleGetStocks(@ConnectedSocket() client: Socket): Promise<void> {
    client.emit('stocks', await this.stockService.getStocks());
  }

  @SubscribeMessage('deleteStock')
  async handleDeleteStock(@MessageBody() stock: Stock): Promise<void> {
    const stocks = await this.stockService.deleteStock(stock);
    this.server.emit('deleteStock', stocks);
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
  }

  handleDisconnect(client: Socket): any {
    console.log('Client Disconnect', client.id);
  }
}
