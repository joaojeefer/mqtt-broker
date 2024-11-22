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
    console.log(machineId, sensorId);

    let machine = await this.dbService.machine.findUnique({
      where: { id: machineId },
    });

    // Se a máquina não existir, insira-a no banco de dados
    if (!machine) {
      console.log('Maquina não existe');
      machine = await this.dbService.machine.create({
        data: {
          name: 'Maquina ' + machineId,
        },
      });
    } else console.log('Máquina existe');

    // verifica se o sensor já existe e se não, insere-o
    const sensor = await this.dbService.sensor.findUnique({
      where: { id: sensorId },
    });

    if (!sensor) {
      console.log('Sensor não existe');
      // Adicione o sensor relacionado a máquina
      await this.dbService.sensor.create({
        data: {
          machineId: machine.id,
          name: 'Sensor ' + sensorId,
        },
      });
    } else console.log('Sensor existe');

    // trocar para função na service de Sensor
    // const sensor = await this.dbService.sensor.findUnique({
    //   where: { id: sensorId },
    // });

    // if (!sensor) {
    //   throw new Error('Sensor not found');
    // }

    // const machine = await this.dbService.machine.update({
    //   where: { id: machineId },
    //   data: {
    //     sensors: {
    //       connect: {
    //         id: sensorId,
    //       },
    //     },
    //   },
    // });

    // return machine;
    return;
  }

  async remove(id: number): Promise<void> {
    await this.dbService.machine.delete({ where: { id } });
  }
}
