import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { DbModule } from 'src/db/db.module';
import { SensorModule } from 'src/sensor/sensor.module';

@Module({
  imports: [DbModule, SensorModule],
  exports: [MachineService],
  providers: [MachineService],
})
export class MachineModule {}
