import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Module({
  exports: [SensorService],
  providers: [SensorService],
})
export class SensorModule {}
