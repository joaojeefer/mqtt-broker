import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import CreateMachineDto from './dto/create-machine.dto';
import { Machine, Sensor } from '@prisma/client';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class MachineService {
  constructor(
    private dbService: PrismaService,
    private sensorService: SensorService,
  ) {}

  async create(data: CreateMachineDto): Promise<Machine> {
    const newMachine = await this.dbService.machine.create({
      data: {
        name: data.name,
      },
    });

    return newMachine;
  }

  async findAll(): Promise<Machine[]> {
    return this.dbService.machine.findMany();
  }

  async findOne(id: number): Promise<Machine> {
    return this.dbService.machine.findUnique({ where: { id } });
  }

  async findOrCreateMachine(machineId: number): Promise<Machine> {
    let machine = await this.findOne(machineId);

    if (!machine) {
      machine = await this.create({ name: `Máquina ${machineId}` });
    }

    return machine;
  }

  async addSensorToMachine(
    machineId: number,
    sensorId: number,
  ): Promise<Sensor> {
    console.log(machineId, sensorId);

    const machine = await this.findOrCreateMachine(machineId);

    const sensor = await this.sensorService.findOrCreateSensor(
      sensorId,
      machine.id,
    );

    return sensor;
  }

  async remove(id: number): Promise<void> {
    await this.dbService.machine.delete({ where: { id } });
  }
}
