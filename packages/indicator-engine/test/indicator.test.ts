import { describe, expect, it } from 'vitest';
import { buildIndicatorSnapshot } from '../src';

const bars = Array.from({ length: 60 }).map((_, i) => ({
  ts: new Date(2025, 0, i + 1).toISOString(),
  open: 10 + i * 0.1,
  high: 10.5 + i * 0.1,
  low: 9.8 + i * 0.1,
  close: 10.2 + i * 0.1,
  volume: 100000 + i * 1000,
}));

describe('indicator snapshot', () => {
  it('builds valid snapshot', () => {
    const s = buildIndicatorSnapshot(bars);
    expect(s.ma5).toBeGreaterThan(0);
    expect(s.macdDiff).toBeTypeOf('number');
    expect(s.adx).toBeGreaterThanOrEqual(0);
  });
});
