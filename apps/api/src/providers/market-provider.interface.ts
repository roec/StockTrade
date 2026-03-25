import type { OHLCVBar, Quote } from '@stock/shared-types';

export interface QuoteProvider {
  getRealtimeQuote(symbol: string): Promise<Quote>;
  getBatchQuotes(symbols: string[]): Promise<Quote[]>;
}

export interface KlineProvider {
  getKlines(symbol: string, timeframe: string, limit: number): Promise<OHLCVBar[]>;
}

export interface MarketOverviewProvider {
  getMarketOverview(): Promise<Record<string, unknown>>;
  searchStocks(query: string): Promise<Array<{ symbol: string; name: string }>>;
}
