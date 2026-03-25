import { Module } from '@nestjs/common';
import { MarketStreamGateway } from './market-stream.gateway';

@Module({ providers: [MarketStreamGateway] })
export class MarketStreamModule {}
