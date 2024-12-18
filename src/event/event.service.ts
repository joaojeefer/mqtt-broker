import { Injectable } from '@nestjs/common';
import CreateEventDto from './dto/create-event.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private dbService: PrismaService) {}

  async create(data: CreateEventDto): Promise<{ eventId: number }> {
    const newEvent = await this.dbService.event.create({
      data: {
        dateTime: data.dateTime,
        value: data.value,
        sensorId: data.sensorId,
      },
    });

    return { eventId: newEvent.id };
  }

  async findAll(): Promise<Event[]> {
    return this.dbService.event.findMany();
  }

  async findOne(id: number): Promise<Event> {
    return this.dbService.event.findUnique({ where: { id } });
  }

  async logEvent(data: Record<string, any>) {
    const value = parseFloat(data.intValue) / data.conversionValue;

    const dateTime = new Date(
      data.year,
      data.month - 1, // EM Javascript os meses começam em 0
      data.day,
      data.hour,
      data.minute,
      data.second,
    );

    await this.create({
      dateTime,
      sensorId: Number(data.sensorId),
      value: value.toString(),
    });
  }

  async remove(id: number): Promise<void> {
    await this.dbService.event.delete({ where: { id } });
  }
}
