import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { MarketDataModule } from '../market-data/market-data.module';

@Module({ imports: [MarketDataModule], providers: [SignalsService], controllers: [SignalsController], exports: [SignalsService] })
export class SignalsModule {}
