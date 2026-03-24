import { Module } from '@nestjs/common';
import { MarketDataController, StockController } from './market-data.controller';
import { MarketDataService } from './market-data.service';
import { MockMarketProvider } from '../../mock/mock-market.provider';

@Module({ controllers: [MarketDataController, StockController], providers: [MarketDataService, MockMarketProvider], exports: [MarketDataService] })
export class MarketDataModule {}
