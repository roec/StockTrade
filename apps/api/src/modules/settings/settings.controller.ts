import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('settings')
export class SettingsController {
  private data = {
    dataSource: 'mock', wsMode: 'websocket', deepseekModel: 'deepseek-chat', timeoutMs: 20000, retry: 2, strategyDefault: 'trend_follow', riskDefault: 'balanced', theme: 'dark'
  };
  @Get() get() { return this.data; }
  @Post() save(@Body() body: Record<string, unknown>) { this.data = { ...this.data, ...body }; return this.data; }
}
