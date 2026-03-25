import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly service: AiService) {}

  @Post('explain-signal')
  explainSignal(@Body() body: Record<string, unknown>) { return this.service.explainSignal(body); }

  @Post('analyze-stock')
  analyzeStock(@Body() body: Record<string, unknown>) { return this.service.explainSignal(body); }

  @Post('compare-stocks')
  compare(@Body() body: { symbols: string[] }) { return this.service.compareStocks(body); }
}
