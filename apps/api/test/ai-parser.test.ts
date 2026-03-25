import { describe, expect, it } from 'vitest';
import { ResponseParser } from '../src/modules/ai/response.parser';

describe('response parser', () => {
  it('parses JSON object', () => {
    const parsed = ResponseParser.parseJson<{ summary: string }>('{"summary":"ok"}');
    expect(parsed.summary).toBe('ok');
  });
});
