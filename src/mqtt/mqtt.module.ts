import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';

@Module({
  providers: [MqttService, BinaryUnpacker],
  exports: [MqttService],
})
export class MqttModule {}
