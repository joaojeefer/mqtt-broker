import { Module } from '@nestjs/common';
import { EventService } from './event.service';

@Module({
  exports: [EventService],
  providers: [EventService],
})
export class EventModule {}
