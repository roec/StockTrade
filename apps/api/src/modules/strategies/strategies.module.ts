import { Module } from '@nestjs/common';
import { StrategiesController } from './strategies.controller';

@Module({ controllers: [StrategiesController] })
export class StrategiesModule {}
