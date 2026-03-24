import { Injectable } from '@nestjs/common';
import { PromptBuilder } from './prompt.builder';
import { DeepSeekProvider } from './deepseek.provider';
import { MockLLMProvider } from './mock-llm.provider';

@Injectable()
export class AiService {
  constructor(
    private readonly deepSeek: DeepSeekProvider,
    private readonly mock: MockLLMProvider,
  ) {}

  async explainSignal(input: Record<string, unknown>) {
    const prompt = PromptBuilder.explainSignal(input);
    const provider = process.env.DEEPSEEK_API_KEY ? this.deepSeek : this.mock;
    return provider.chatJson(prompt);
  }

  compareStocks(payload: { symbols: string[] }) {
    return {
      ranking: payload.symbols,
      rationale: '基于趋势、量能、风险三维度进行演示排序。',
    };
  }
}
