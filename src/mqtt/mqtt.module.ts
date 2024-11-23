import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';
import { DbModule } from 'src/db/db.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [DbModule, EventModule],
  providers: [MqttService, BinaryUnpacker],
  exports: [MqttService],
})
export class MqttModule {}
