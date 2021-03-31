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
  handleEditSave(@MessageBody() stock: Stock): void {
    const stocks = this.stockService.editStock(stock);
    this.server.emit('editStock', stocks);
  }

  @SubscribeMessage('getStocks')
  handleGetStocks(@ConnectedSocket() client: Socket): void {
    client.emit('stocks', this.stockService.getStocks());
  }

  @SubscribeMessage('deleteStock')
  handleDeleteStock(@MessageBody() stock: Stock): void {
    const stocks = this.stockService.deleteStock(stock);
    this.server.emit('deleteStock', stocks);
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
  }

  handleDisconnect(client: Socket): any {
    console.log('Client Disconnect', client.id);
  }
}
