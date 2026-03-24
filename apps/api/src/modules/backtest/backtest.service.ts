import { Injectable } from '@nestjs/common';
import { calculateBacktestMetrics } from '@stock/signal-engine';

@Injectable()
export class BacktestService {
  run(symbol: string) {
    const equityCurve = Array.from({ length: 120 }).map((_, i) => 1 + i * 0.002 + Math.sin(i / 8) * 0.03);
    const metrics = calculateBacktestMetrics(equityCurve, 33, 58, 7);
    return { id: `bt-${Date.now()}`, symbol, equityCurve, trades: [{ side: 'buy', price: 10.2 }, { side: 'sell', price: 10.9 }], metrics };
  }
}
