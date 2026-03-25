import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { DeepSeekProvider } from './deepseek.provider';
import { MockLLMProvider } from './mock-llm.provider';

@Module({ controllers: [AiController], providers: [AiService, DeepSeekProvider, MockLLMProvider], exports: [AiService] })
export class AiModule {}
