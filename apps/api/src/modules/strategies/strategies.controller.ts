import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('strategies')
export class StrategiesController {
  @Get() list() {
    return [
      { id: 'trend_follow', name: '趋势跟随', indicators: ['MA', 'MACD', 'DMI'] },
      { id: 'volume_breakout', name: '量价突破', indicators: ['MA', 'BOLL', 'VOL_MA'] },
      { id: 'rebound_capture', name: '反弹捕捉', indicators: ['KDJ', 'BIAS', 'PSY'] },
    ];
  }

  @Post('evaluate')
  evaluate(@Body() body: { symbol: string; strategyId: string }) {
    return {
      symbol: body.symbol,
      strategyId: body.strategyId,
      matched: true,
      why: ['MA多头排列', 'MACD红柱扩大', '价涨量增'],
      score: 78,
    };
  }
}
