import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { Claim, ClaimSchema } from './schema/claim.schema';
import { Event, EventSchema } from '../event/schema/event.schema';
import { Checkin, CheckinSchema } from '../checkin/schema/checkin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Claim.name, schema: ClaimSchema },
      { name: Event.name, schema: EventSchema },
      { name: Checkin.name, schema: CheckinSchema },
    ]),
  ],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}