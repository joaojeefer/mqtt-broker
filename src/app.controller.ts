import { Controller, Post } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('/test')
  getHello(): string {
    this.mqttService.mqtt.publish(
      '/to-device',
      'Hello from server',
      { qos: 1, retain: true },
      (error) => console.log(error),
    );

    return 'Message sent!';
  }
}
