import { Controller, Get, Param } from '@nestjs/common';
import { SignalsService } from './signals.service';

@Controller('signals')
export class SignalsController {
  constructor(private readonly service: SignalsService) {}
  @Get(':symbol') bySymbol(@Param('symbol') symbol: string) { return this.service.evaluate(symbol); }
}
