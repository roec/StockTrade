import { Controller, Get, Param, Query } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('market')
export class MarketDataController {
  constructor(private readonly service: MarketDataService) {}
  @Get('overview') overview() { return this.service.getOverview(); }
  @Get('quote/:symbol') quote(@Param('symbol') symbol: string) { return this.service.getQuote(symbol); }
  @Get('klines/:symbol') klines(@Param('symbol') symbol: string, @Query('timeframe') timeframe = '1d', @Query('limit') limit = '120') {
    return this.service.getKlines(symbol, timeframe, Number(limit));
  }
}

@Controller('stocks')
export class StockController {
  constructor(private readonly service: MarketDataService) {}
  @Get('search') search(@Query('query') query = '') { return this.service.search(query); }
}
