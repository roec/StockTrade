import { describe, expect, it } from 'vitest';
import { MockMarketProvider } from '../src/mock/mock-market.provider';

describe('api shape', () => {
  it('quote has required fields', async () => {
    const provider = new MockMarketProvider();
    const q = await provider.getRealtimeQuote('600519.SH');
    expect(q).toHaveProperty('symbol');
    expect(q).toHaveProperty('price');
  });
});
