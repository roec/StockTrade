import { Injectable } from '@nestjs/common';
import type { OHLCVBar, Quote } from '@stock/shared-types';

@Injectable()
export class MockMarketProvider {
  async getRealtimeQuote(symbol: string): Promise<Quote> {
    const price = 10 + Number((Math.random() * 20).toFixed(2));
    return { symbol, name: `示例${symbol}`, price, changePct: Number((Math.random() * 4 - 2).toFixed(2)), volume: 1200000, turnover: price * 1200000, updatedAt: new Date().toISOString() };
  }
  async getBatchQuotes(symbols: string[]): Promise<Quote[]> { return Promise.all(symbols.map((s) => this.getRealtimeQuote(s))); }
  async getKlines(_symbol: string, _timeframe: string, limit: number): Promise<OHLCVBar[]> {
    return Array.from({ length: limit }).map((_, i) => {
      const base = 10 + i * 0.04;
      return { ts: new Date(Date.now() - (limit - i) * 86400000).toISOString(), open: base, high: base + 0.5, low: base - 0.4, close: base + 0.2, volume: 100000 + i * 1500 };
    });
  }
  async getMarketOverview() {
    return {
      indices: [{ symbol: '000001.SH', name: '上证指数', changePct: 0.54 }, { symbol: '399001.SZ', name: '深证成指', changePct: -0.12 }],
      sentiment: { score: 18, label: 'neutral' },
      volumeAnomalySummary: ['放量突破: 38', '缩量企稳: 22'],
      hotSectors: ['算力', '机器人', '新能源车'],
    };
  }
  async searchStocks(query: string) {
    return [
      { symbol: '600519.SH', name: '贵州茅台' },
      { symbol: '000001.SZ', name: '平安银行' },
      { symbol: '300750.SZ', name: '宁德时代' },
    ].filter((item) => item.symbol.includes(query) || item.name.includes(query));
  }
}
