import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { Checkin, CheckinSchema } from './schema/checkin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Checkin.name, schema: CheckinSchema }])],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule {}
