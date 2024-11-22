import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';
import { MachineService } from 'src/machine/machine.service';
import { PrismaService } from '../db/prisma.service';
import { SensorService } from 'src/sensor/sensor.service';

@Module({
  providers: [
    MqttService,
    BinaryUnpacker,
    MachineService,
    SensorService,
    PrismaService,
  ],
  exports: [MqttService],
})
export class MqttModule {}
