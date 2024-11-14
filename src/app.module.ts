import { Module } from '@nestjs/common';
import { MqttModule } from './mqtt/mqtt.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, MqttModule],
})
export class AppModule {}
