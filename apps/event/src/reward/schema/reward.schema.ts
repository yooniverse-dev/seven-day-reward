import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reward extends Document {
  @Prop({ required: true })
  eventId!: string;

  @Prop({ required: true })
  type!: 'ITEM' | 'POINT' | 'COUPON';

  @Prop({ required: true })
  value!: string;

  @Prop({ required: true })
  amount!: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);