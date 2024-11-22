import { Injectable } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';

import { BinaryUnpacker } from './binary-unpacker';
import { MachineService } from 'src/machine/machine.service';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class MqttService {
  public readonly mqttClient: MqttClient;

  constructor(
    private readonly unpacker: BinaryUnpacker,
    private readonly machineService: MachineService,
    private readonly sensorService: SensorService,
  ) {
    this.mqttClient = connect(process.env.connectUrl, {
      //clientId: process.env.clientId || null,
      clean: true,
      connectTimeout: parseInt(process.env.connectTimeout, 10),
      //username: process.env.username,
      //password: process.env.password,
      reconnectPeriod: parseInt(process.env.reconnectPeriod, 10),
    });

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT server');
    });

    this.mqttClient.on('error', (error) => {
      console.error('Error in connecting to CloudMQTT');
      console.error(error);
    });

    //this.mqttClient.subscribe('/from-device', { qos: 1 });
    this.mqttClient.subscribe('IoTSensors/Machines/#', { qos: 1 });

    this.mqttClient.on('message', (topic, message) => {
      // Descompatar a mensagem recebida.
      console.log(`New message received from topic: ${topic}\n`);
      //console.log(message.toString());

      console.log('--message size--');
      console.log(message.length);

      const buffer = Buffer.from(message); // Converte a mensagem para buffer
      const unpackedData = this.unpacker.unpack(buffer); // Faz o unpack
      console.log('Mensagem descompactada:', unpackedData);
      const float_value =
        parseFloat(unpackedData.intValue) / unpackedData.conversionValue;
      console.log('Valor reconstituído:', float_value);

      this.machineService.addSensorToMachine(
        unpackedData.machineId,
        unpackedData.sensorId,
      );
      this.sensorService.addEventToSensor(
        unpackedData.sensorId,
        float_value,
        unpackedData.machineId,
      );
    });
  }
}
