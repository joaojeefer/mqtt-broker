import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';
import { EventService } from 'src/event/event.service';

@Module({
  providers: [MqttService, BinaryUnpacker, EventService],
  exports: [MqttService],
})
export class MqttModule {}
