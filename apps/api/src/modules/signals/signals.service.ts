import { Injectable } from '@nestjs/common';
import { buildIndicatorSnapshot, interpretIndicators } from '@stock/indicator-engine';
import { evaluateSignal } from '@stock/signal-engine';
import { MarketDataService } from '../market-data/market-data.service';

@Injectable()
export class SignalsService {
  constructor(private readonly marketData: MarketDataService) {}

  async evaluate(symbol: string) {
    const [quote, bars] = await Promise.all([
      this.marketData.getQuote(symbol),
      this.marketData.getKlines(symbol, '1d', 120),
    ]);
    const indicator = buildIndicatorSnapshot(bars);
    const signal = evaluateSignal({
      price: quote.price,
      indicator,
      sentiment: { symbol, score: 12, label: 'neutral', source: 'mock', ts: new Date().toISOString() },
      volumeRatio: bars.at(-1)!.volume / (bars.slice(-20).reduce((sum, b) => sum + b.volume, 0) / 20),
    });
    return { symbol, quote, indicator, indicatorNotes: interpretIndicators(indicator), signal };
  }
}
