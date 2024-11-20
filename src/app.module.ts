import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { DbModule } from './db/db.module';
import { SensorModule } from './sensor/sensor.module';
import { MachineModule } from './machine/machine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    MqttModule,
    SensorModule,
    MachineModule,
  ],
})
export class AppModule {}
