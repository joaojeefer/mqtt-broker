import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import CreateMachineDto from './dto/create-machine.dto';
import { Machine } from '@prisma/client';

@Injectable()
export class MachineService {
  constructor(private dbService: PrismaService) {}

  async create(data: CreateMachineDto): Promise<{ machineId: number }> {
    const newMachine = await this.dbService.machine.create({
      data: {
        name: data.name,
      },
    });

    return { machineId: newMachine.id };
  }

  async findAll(): Promise<Machine[]> {
    return this.dbService.machine.findMany();
  }

  async findOne(id: number): Promise<Machine> {
    return this.dbService.machine.findUnique({ where: { id } });
  }

  async addSensorToMachine(
    machineId: number,
    sensorId: number,
  ): Promise<Machine> {
    // trocar para função na service de Sensor
    const sensor = await this.dbService.sensor.findUnique({
      where: { id: sensorId },
    });

    if (!sensor) {
      throw new Error('Sensor not found');
    }

    const machine = await this.dbService.machine.update({
      where: { id: machineId },
      data: {
        sensors: {
          connect: {
            id: sensorId,
          },
        },
      },
    });

    return machine;
  }

  async remove(id: number): Promise<void> {
    await this.dbService.machine.delete({ where: { id } });
  }
}
