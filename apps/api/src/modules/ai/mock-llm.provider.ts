import { Injectable } from '@nestjs/common';
import type { LLMProvider } from './ai.types';

@Injectable()
export class MockLLMProvider implements LLMProvider {
  async chatJson<T>(): Promise<T> {
    return {
      summary: '示例AI解读：趋势偏强但存在量价分歧。',
      positives: ['多头排列', 'MACD红柱'],
      negatives: ['放量不足'],
      riskWarnings: ['谨防冲高回落'],
      confidenceComment: '中等置信',
    } as T;
  }
}
