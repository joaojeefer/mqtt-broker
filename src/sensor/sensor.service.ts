import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import CreateSensorDto from './dto/create-sensor.dto';
import { Sensor } from '@prisma/client';

@Injectable()
export class SensorService {
  constructor(private dbService: PrismaService) {}

  async create(data: CreateSensorDto): Promise<{ sensorId: number }> {
    const newSensor = await this.dbService.sensor.create({
      data: {
        name: data.name,
        measureType: data.measureType,
        measureUnit: data.measureUnit,
        machineId: data.machineId,
      },
    });

    return { sensorId: newSensor.id };
  }

  async findAll(): Promise<Sensor[]> {
    return this.dbService.sensor.findMany();
  }

  async findOne(id: number): Promise<Sensor> {
    return this.dbService.sensor.findUnique({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.dbService.sensor.delete({
      where: { id },
    });
  }
}
