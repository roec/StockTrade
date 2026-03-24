export type SignalDirection = 'buy' | 'sell' | 'hold' | 'watch';
export type SentimentLabel = 'positive' | 'neutral' | 'negative' | 'panic' | 'euphoric';

export interface OHLCVBar {
  ts: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Quote {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  volume: number;
  turnover: number;
  updatedAt: string;
}

export interface IndicatorSnapshot {
  ma5: number;
  ma10: number;
  ma20: number;
  ema12: number;
  ema26: number;
  macdDiff: number;
  macdDea: number;
  macdHist: number;
  k: number;
  d: number;
  j: number;
  bollMid: number;
  bollUpper: number;
  bollLower: number;
  psy: number;
  pdi: number;
  mdi: number;
  adx: number;
  adxr: number;
  bias6: number;
  sar: number;
}

export interface SignalBreakdown {
  trendScore: number;
  momentumScore: number;
  volumeScore: number;
  reversalScore: number;
  sentimentScore: number;
  riskPenalty: number;
  regimeAdjustment: number;
  overallScore: number;
}

export interface TradingSignal {
  direction: SignalDirection;
  confidence: number;
  breakdown: SignalBreakdown;
  reasonCodes: string[];
  riskTags: string[];
  stopLoss: number;
  takeProfit: number;
  positionSizePct: number;
  explainability: Record<string, unknown>;
  conflicts: string[];
}

export interface SentimentSnapshot {
  symbol: string;
  score: number;
  label: SentimentLabel;
  source: string;
  ts: string;
}
