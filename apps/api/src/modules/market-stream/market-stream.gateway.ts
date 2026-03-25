import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'market-stream' })
export class MarketStreamGateway {
  @WebSocketServer() server!: Server;

  @SubscribeMessage('subscribeQuotes')
  subscribeQuotes(payload: { symbols: string[] }) {
    this.server.emit('quoteUpdate', { symbols: payload.symbols, ts: new Date().toISOString(), freshness: 'realtime' });
  }

  @SubscribeMessage('subscribeKlines')
  subscribeKlines(payload: { symbol: string; timeframe: string }) {
    this.server.emit('klineUpdate', { ...payload, ts: new Date().toISOString() });
  }
}
