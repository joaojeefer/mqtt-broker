import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [SensorService],
  providers: [SensorService],
})
export class SensorModule {}
