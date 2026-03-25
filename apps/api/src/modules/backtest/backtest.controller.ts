import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BacktestService } from './backtest.service';

@Controller('backtest')
export class BacktestController {
  constructor(private readonly service: BacktestService) {}
  @Post('run') run(@Body() body: { symbol: string }) { return this.service.run(body.symbol); }
  @Get(':id') get(@Param('id') id: string) { return { id, status: 'completed' }; }
}
