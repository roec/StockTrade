import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MarketDataModule } from './modules/market-data/market-data.module';
import { SignalsModule } from './modules/signals/signals.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { StrategiesModule } from './modules/strategies/strategies.module';
import { BacktestModule } from './modules/backtest/backtest.module';
import { RiskModule } from './modules/risk/risk.module';
import { SentimentModule } from './modules/sentiment/sentiment.module';
import { AiModule } from './modules/ai/ai.module';
import { SettingsModule } from './modules/settings/settings.module';
import { HealthModule } from './modules/health/health.module';
import { MarketStreamModule } from './modules/market-stream/market-stream.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MarketDataModule, SignalsModule, WatchlistModule, StrategiesModule, BacktestModule, RiskModule, SentimentModule, AiModule, SettingsModule, HealthModule, MarketStreamModule],
})
export class AppModule {}
