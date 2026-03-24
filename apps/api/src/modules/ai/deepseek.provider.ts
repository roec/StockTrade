import OpenAI from 'openai';
import { Injectable, Logger } from '@nestjs/common';
import { defaultEnvConfig } from '@stock/config';
import type { LLMProvider } from './ai.types';
import { ResponseParser } from './response.parser';

@Injectable()
export class DeepSeekProvider implements LLMProvider {
  private readonly logger = new Logger(DeepSeekProvider.name);
  private readonly client = new OpenAI({ apiKey: defaultEnvConfig.deepseekApiKey, baseURL: defaultEnvConfig.deepseekApiBase });

  async chatJson<T>(input: { system: string; user: string; schemaHint: string; model?: string; timeoutMs?: number; }): Promise<T> {
    const model = input.model ?? defaultEnvConfig.deepseekModel;
    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: `${input.system} 输出必须为JSON。Schema:${input.schemaHint}` },
          { role: 'user', content: input.user },
        ],
        response_format: { type: 'json_object' },
      }, { timeout: input.timeoutMs ?? defaultEnvConfig.deepseekTimeoutMs });
      const content = completion.choices[0]?.message?.content ?? '{}';
      return ResponseParser.parseJson<T>(content);
    } catch (error) {
      this.logger.warn(`DeepSeek fail, fallback mock: ${String(error)}`);
      return { summary: 'DeepSeek不可用，已降级为Mock解释', positives: [], negatives: ['外部AI服务暂不可用'], riskWarnings: ['请人工复核'], confidenceComment: '低置信' } as T;
    }
  }
}
