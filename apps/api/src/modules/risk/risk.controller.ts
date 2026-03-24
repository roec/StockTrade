import { Body, Controller, Post } from '@nestjs/common';
import { evaluateRisk } from '@stock/signal-engine';

@Controller('risk')
export class RiskController {
  @Post('evaluate')
  evaluate(@Body() body: { price: number; atrPct: number; signalConfidence: number }) {
    return evaluateRisk(body.price, body.atrPct, body.signalConfidence);
  }
}
