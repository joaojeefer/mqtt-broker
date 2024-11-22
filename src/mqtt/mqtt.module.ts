import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';
import { EventService } from 'src/event/event.service';
import { DbModule } from 'src/db/db.module';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports: [DbModule, MachineModule],
  providers: [MqttService, BinaryUnpacker, EventService],
  exports: [MqttService],
})
export class MqttModule {}
