import { Controller, Get, Param } from '@nestjs/common';

@Controller('sentiment')
export class SentimentController {
  @Get(':symbol') get(@Param('symbol') symbol: string) {
    return { symbol, score: 24, label: 'positive', components: { news: 12, forum: 8, announcement: 4 } };
  }
}
