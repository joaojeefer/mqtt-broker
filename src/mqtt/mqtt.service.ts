import { Injectable } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';

import { BinaryUnpacker } from './binary-unpacker';
import { EventService } from 'src/event/event.service';

@Injectable()
export class MqttService {
  public readonly mqttClient: MqttClient;

  constructor(
    private readonly unpacker: BinaryUnpacker,
    private readonly eventService: EventService,
  ) {
    this.mqttClient = connect(process.env.connectUrl, {
      clean: true,
      connectTimeout: parseInt(process.env.connectTimeout, 10),
      reconnectPeriod: parseInt(process.env.reconnectPeriod, 10),
    });

    this.mqttClient.on('connect', () => {
      console.log('Conectou ao servidor MQTT');
    });

    this.mqttClient.on('error', (error) => {
      console.error('Falha ao conectar ao CloudMQTT');
      console.error(error);
    });

    this.mqttClient.subscribe('IoTSensors/Machines/#', { qos: 1 });

    this.mqttClient.on('message', (topic, message) => {
      console.log(`Nova mensagem recebida via tópico: ${topic}\n`);

      // Converte a mensagem para buffer
      const buffer = Buffer.from(message);

      // Faz o unpack da mensagem
      const unpackedData = this.unpacker.unpack(buffer);

      // Loga o evento
      this.eventService.logEvent(unpackedData);
    });
  }
}
