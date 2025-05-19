import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Claim extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  eventId!: string;

  @Prop({ required: true })
  status!: 'SUCCESS' | 'DUPLICATE' | 'FAILED';

  @Prop({ default: Date.now })
  requestedAt!: Date;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);