import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';

@Module({
  exports: [MachineService],
  providers: [MachineService],
})
export class MachineModule {}
