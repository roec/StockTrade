import type { IndicatorSnapshot, SentimentSnapshot, TradingSignal } from '@stock/shared-types';
import { clamp } from '@stock/shared-utils';

export interface SignalInput {
  price: number;
  indicator: IndicatorSnapshot;
  sentiment: SentimentSnapshot;
  volumeRatio: number;
}

export const evaluateSignal = (input: SignalInput): TradingSignal => {
  const trendScore = input.indicator.ma5 > input.indicator.ma20 ? 22 : 8;
  const momentumScore = input.indicator.macdHist > 0 ? 18 : 6;
  const volumeScore = input.volumeRatio > 1.2 ? 15 : 7;
  const reversalScore = input.indicator.k < 20 ? 14 : 6;
  const sentimentScore = (input.sentiment.score + 100) / 10;
  const riskPenalty = input.indicator.j > 95 ? 12 : 4;
  const regimeAdjustment = input.indicator.adx > 25 ? 8 : -3;
  const overallScore = trendScore + momentumScore + volumeScore + reversalScore + sentimentScore + regimeAdjustment - riskPenalty;
  const confidence = clamp(Math.round(overallScore), 0, 100);

  const direction = confidence >= 75 ? 'buy' : confidence <= 35 ? 'sell' : confidence >= 55 ? 'watch' : 'hold';
  const reasonCodes = [
    trendScore > 18 ? 'MA_BULL_ALIGNMENT' : 'MA_WEAK',
    momentumScore > 15 ? 'MACD_POSITIVE' : 'MACD_NEGATIVE',
    volumeScore > 12 ? 'VOLUME_CONFIRMATION' : 'VOLUME_WEAK',
  ];
  const conflicts = [] as string[];
  if (input.indicator.macdHist > 0 && input.volumeRatio < 0.9) conflicts.push('放量不足，存在上涨背离风险');
  if (input.indicator.k > 85 && direction === 'buy') conflicts.push('KDJ过热，追高风险');

  return {
    direction,
    confidence,
    breakdown: { trendScore, momentumScore, volumeScore, reversalScore, sentimentScore, riskPenalty, regimeAdjustment, overallScore },
    reasonCodes,
    riskTags: conflicts.length ? ['signal_conflict'] : ['normal'],
    stopLoss: input.price * 0.95,
    takeProfit: input.price * 1.12,
    positionSizePct: clamp(30 + confidence * 0.5 - riskPenalty, 5, 80),
    explainability: {
      positives: reasonCodes.filter((x) => x.includes('POSITIVE') || x.includes('BULL') || x.includes('CONFIRMATION')),
      negatives: reasonCodes.filter((x) => x.includes('WEAK') || x.includes('NEGATIVE')),
      chineseTags: conflicts.length ? ['放量滞涨'] : ['放量突破'],
    },
    conflicts,
  };
};

export interface RiskSuggestion {
  stopLoss: number;
  takeProfit: number;
  positionSizePct: number;
  warnings: string[];
}

export const evaluateRisk = (price: number, atrPct: number, signalConfidence: number): RiskSuggestion => {
  const stopLoss = price * (1 - clamp(atrPct * 1.5, 0.03, 0.12));
  const takeProfit = price * (1 + clamp(atrPct * 2.2, 0.05, 0.25));
  const positionSizePct = clamp(20 + signalConfidence * 0.4 - atrPct * 100, 5, 70);
  const warnings = atrPct > 0.06 ? ['波动率偏高，建议降低仓位'] : [];
  return { stopLoss, takeProfit, positionSizePct, warnings };
};

export const calculateBacktestMetrics = (equityCurve: number[], wins: number, trades: number, holdingDaysAvg: number) => {
  const start = equityCurve[0] ?? 1;
  const end = equityCurve.at(-1) ?? start;
  const totalReturn = (end - start) / start;
  let peak = start;
  let maxDrawdown = 0;
  for (const v of equityCurve) {
    peak = Math.max(peak, v);
    maxDrawdown = Math.max(maxDrawdown, (peak - v) / peak);
  }
  const winRate = trades ? wins / trades : 0;
  return {
    totalReturn,
    annualizedReturn: totalReturn * (252 / Math.max(equityCurve.length, 1)),
    maxDrawdown,
    winRate,
    sharpe: totalReturn / Math.max(maxDrawdown, 0.001),
    trades,
    avgHoldingPeriod: holdingDaysAvg,
    profitFactor: winRate > 0 ? winRate / Math.max(1 - winRate, 0.01) : 0,
  };
};
