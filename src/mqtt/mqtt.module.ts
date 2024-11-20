import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { BinaryUnpacker } from './binary-unpacker';
import { MachineService } from 'src/machine/machine.service';
import { PrismaService } from '../db/prisma.service';

@Module({
  providers: [MqttService, BinaryUnpacker, MachineService, PrismaService],
  exports: [MqttService],
})
export class MqttModule {}
