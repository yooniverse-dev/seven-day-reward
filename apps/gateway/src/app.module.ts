import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [GatewayController],
})
export class AppModule {}
