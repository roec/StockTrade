import { describe, expect, it } from 'vitest';
import { evaluateRisk, evaluateSignal, calculateBacktestMetrics } from '../src';

describe('signal engine', () => {
  it('produces decision with explainability', () => {
    const signal = evaluateSignal({
      price: 12,
      volumeRatio: 1.4,
      sentiment: { symbol: '600519.SH', score: 35, label: 'positive', source: 'mock', ts: new Date().toISOString() },
      indicator: {
        ma5: 12, ma10: 11.8, ma20: 11.4, ema12: 11.9, ema26: 11.6,
        macdDiff: 0.3, macdDea: 0.2, macdHist: 0.2,
        k: 65, d: 58, j: 79,
        bollMid: 11.7, bollUpper: 12.4, bollLower: 10.8,
        psy: 63, pdi: 27, mdi: 18, adx: 29, adxr: 26, bias6: 4, sar: 11.5,
      },
    });
    expect(signal.confidence).toBeGreaterThan(0);
    expect(signal.reasonCodes.length).toBeGreaterThan(1);
  });

  it('calculates risk and backtest metrics', () => {
    const risk = evaluateRisk(10, 0.04, 70);
    expect(risk.positionSizePct).toBeGreaterThan(0);
    const metrics = calculateBacktestMetrics([1, 1.1, 1.05, 1.2], 6, 10, 5);
    expect(metrics.maxDrawdown).toBeGreaterThanOrEqual(0);
  });
});
