import { Injectable } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';

@Injectable()
export class MqttService {
  public readonly mqttClient: MqttClient;

  constructor() {
    this.mqttClient = connect(process.env.connectUrl, {
      clientId: process.env.clientId || null,
      clean: true,
      connectTimeout: parseInt(process.env.connectTimeout, 10),
      username: process.env.username,
      password: process.env.password,
      reconnectPeriod: parseInt(process.env.reconnectPeriod, 10),
    });

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT server');
    });

    this.mqttClient.on('error', () => {
      console.error('Error in connecting to CloudMQTT');
    });

    this.mqttClient.subscribe('/from-device', { qos: 1 });

    this.mqttClient.on('message', (topic, message) => {
      // Descompatar a mensagem recebida.
      console.log(`New message received from topic: ${topic}`);
      console.log(message.toString());
    });
  }
}
