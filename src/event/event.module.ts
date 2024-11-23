import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { DbModule } from 'src/db/db.module';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports: [DbModule, MachineModule],
  exports: [EventService],
  providers: [EventService],
})
export class EventModule {}
