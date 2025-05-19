import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Checkin extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  date!: Date;
}

export const CheckinSchema = SchemaFactory.createForClass(Checkin);
