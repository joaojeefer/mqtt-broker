import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [EventService],
  providers: [EventService],
})
export class EventModule {}
