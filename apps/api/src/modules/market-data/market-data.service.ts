import { Injectable } from '@nestjs/common';
import { MockMarketProvider } from '../../mock/mock-market.provider';

@Injectable()
export class MarketDataService {
  constructor(private readonly provider: MockMarketProvider) {}
  getOverview() { return this.provider.getMarketOverview(); }
  getQuote(symbol: string) { return this.provider.getRealtimeQuote(symbol); }
  getKlines(symbol: string, timeframe: string, limit: number) { return this.provider.getKlines(symbol, timeframe, limit); }
  search(query: string) { return this.provider.searchStocks(query); }
}
