import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [MachineService],
  providers: [MachineService],
})
export class MachineModule {}
