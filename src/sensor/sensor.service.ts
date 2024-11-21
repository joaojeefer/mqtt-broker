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

  async update(id: number, data: CreateSensorDto): Promise<Sensor> {
    return this.dbService.sensor.update({
      where: { id },
      data: {
        name: data.name,
        measureType: data.measureType,
        measureUnit: data.measureUnit,
      },
    });
  }

  async findMachineSensors(machineId: number): Promise<Sensor[]> {
    return this.dbService.sensor.findMany({
      where: { machineId },
    });
  }

  async addEventToSensor(sensorId: number, eventId: number, machineId: number): Promise<Sensor> {
    // return this.dbService.sensor.update({
    //   where: { id: sensorId },
    //   data: {
    //     events: {
    //       connect: { id: eventId },
    //     },
    //   },
    // });
    console.log("Sensor ID: ", sensorId, "Event ID: ", eventId);
    let sensor = await this.dbService.sensor.findUnique({
      where: { id: sensorId },
    });

    // Se a máquina não existir, insira-a no banco de dados
    if (!sensor) {
      console.log("Maquina não existe")
      sensor = await this.dbService.sensor.create({
        data: {
          name: "Sensor " + sensorId,
          measureType: "defaultType",
          measureUnit: "defaultUnit",
          machine: {
            connect: { id: machineId }
          }
        },
      });
    }
    else
      console.log("Sensor existe");

    // verifica se o sensor já existe e se não, insere-o
    const event = await this.dbService.event.findUnique({
      where: { id: sensorId },
    });

    if (!event) {
      console.log("Sensor não existe");
      // Adicione o sensor relacionado a máquina
      await this.dbService.event.create({
        data: {
          sensor: {
            connect: { id: sensor.id },
          },
          dateTime: new Date(),
          value: 'teste', 
        },
      });
    }
    else
      console.log("Sensor existe");
    return;
  } 
  
}
