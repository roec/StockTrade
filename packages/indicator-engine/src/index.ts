import type { OHLCVBar, IndicatorSnapshot } from '@stock/shared-types';
import { mean, stdDev } from '@stock/shared-utils';

const tail = <T>(arr: T[], n: number) => arr.slice(Math.max(0, arr.length - n));
const closes = (bars: OHLCVBar[]) => bars.map((b) => b.close);
const highs = (bars: OHLCVBar[]) => bars.map((b) => b.high);
const lows = (bars: OHLCVBar[]) => bars.map((b) => b.low);

export const ma = (values: number[], period: number) => mean(tail(values, period));
export const ema = (values: number[], period: number) => {
  const k = 2 / (period + 1);
  return values.reduce((acc, v, i) => (i === 0 ? v : v * k + acc * (1 - k)), 0);
};
export const sma = (values: number[], period: number, m = 1) => {
  let prev = values[0] ?? 0;
  for (const v of values.slice(1)) prev = (m * v + (period - m) * prev) / period;
  return prev;
};

export const macd = (values: number[]) => {
  const diff = ema(values, 12) - ema(values, 26);
  const dea = ema([...values.slice(-8), diff], 9);
  return { diff, dea, hist: (diff - dea) * 2 };
};

export const kdj = (bars: OHLCVBar[]) => {
  const slice = tail(bars, 9);
  const llv = Math.min(...lows(slice));
  const hhv = Math.max(...highs(slice));
  const rsv = ((slice.at(-1)!.close - llv) / Math.max(hhv - llv, 0.0001)) * 100;
  const k = sma([50, rsv], 3, 1);
  const d = sma([50, k], 3, 1);
  return { k, d, j: 3 * k - 2 * d };
};

export const boll = (values: number[], period = 20, mult = 2) => {
  const p = tail(values, period);
  const mid = mean(p);
  const sd = stdDev(p);
  return { mid, upper: mid + sd * mult, lower: mid - sd * mult };
};

export const psy = (values: number[], period = 12) => {
  const p = tail(values, period + 1);
  let up = 0;
  for (let i = 1; i < p.length; i++) if (p[i] > p[i - 1]) up++;
  return (up / Math.max(period, 1)) * 100;
};

export const dmi = (bars: OHLCVBar[], period = 14) => {
  const p = tail(bars, period + 1);
  let tr = 0, pdm = 0, mdm = 0;
  for (let i = 1; i < p.length; i++) {
    const up = p[i].high - p[i - 1].high;
    const down = p[i - 1].low - p[i].low;
    pdm += up > down && up > 0 ? up : 0;
    mdm += down > up && down > 0 ? down : 0;
    tr += Math.max(p[i].high - p[i].low, Math.abs(p[i].high - p[i - 1].close), Math.abs(p[i].low - p[i - 1].close));
  }
  const pdi = (pdm / Math.max(tr, 0.0001)) * 100;
  const mdi = (mdm / Math.max(tr, 0.0001)) * 100;
  const adx = (Math.abs(pdi - mdi) / Math.max(pdi + mdi, 0.0001)) * 100;
  const adxr = (adx + 25) / 2;
  return { pdi, mdi, adx, adxr };
};

export const bias = (values: number[], period = 6) => {
  const m = ma(values, period);
  const c = values.at(-1) ?? 0;
  return ((c - m) / Math.max(m, 0.0001)) * 100;
};

export const sar = (bars: OHLCVBar[]) => {
  const p = tail(bars, 5);
  return Math.min(...lows(p));
};

export const buildIndicatorSnapshot = (bars: OHLCVBar[]): IndicatorSnapshot => {
  const c = closes(bars);
  const m = macd(c);
  const k = kdj(bars);
  const b = boll(c);
  const d = dmi(bars);
  return {
    ma5: ma(c, 5), ma10: ma(c, 10), ma20: ma(c, 20), ema12: ema(c, 12), ema26: ema(c, 26),
    macdDiff: m.diff, macdDea: m.dea, macdHist: m.hist,
    k: k.k, d: k.d, j: k.j,
    bollMid: b.mid, bollUpper: b.upper, bollLower: b.lower,
    psy: psy(c), pdi: d.pdi, mdi: d.mdi, adx: d.adx, adxr: d.adxr,
    bias6: bias(c), sar: sar(bars)
  };
};

export const interpretIndicators = (snapshot: IndicatorSnapshot): string[] => {
  const notes: string[] = [];
  if (snapshot.ma5 > snapshot.ma10 && snapshot.ma10 > snapshot.ma20) notes.push('多头排列');
  if (snapshot.macdHist > 0) notes.push('MACD红柱');
  if (snapshot.k > 80 && snapshot.d > 70) notes.push('KDJ高位');
  if (snapshot.psy > 75) notes.push('PSY情绪过热');
  return notes;
};
