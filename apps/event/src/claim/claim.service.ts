import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim } from './schema/claim.schema';
import { Event } from '../event/schema/event.schema';
import { Checkin } from '../checkin/schema/checkin.schema';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<Claim>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Checkin.name) private checkinModel: Model<Checkin>,
  ) {}

  async requestReward(userId: string, eventId: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      await this.claimModel.create({ userId, eventId, status: 'FAILED' });
      return { status: 'FAILED', message: '이벤트가 존재하지 않습니다.' };
    }

    const now = new Date();
    if (now < event.startDate || now > event.endDate) {
      await this.claimModel.create({ userId, eventId, status: 'FAILED' });
      return { status: 'FAILED', message: '이벤트 기간이 아닙니다.' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyClaimed = await this.claimModel.findOne({ userId, eventId, requestedAt: { $gte: today } });
    if (alreadyClaimed) {
      await this.claimModel.create({ userId, eventId, status: 'DUPLICATE' });
      return { status: 'DUPLICATE', message: '오늘은 이미 보상을 받았습니다.' };
    }

    const checkin = await this.checkinModel.findOne({ userId, date: today });
    if (!checkin) {
      await this.claimModel.create({ userId, eventId, status: 'FAILED' });
      return { status: 'FAILED', message: '오늘 출석하지 않았습니다.' };
    }

    await this.claimModel.create({ userId, eventId, status: 'SUCCESS' });
    return {
      status: 'SUCCESS',
      message: '오늘 보상이 성공적으로 지급되었습니다.',
    };
  }

  async getClaims(userId?: string) {
    if (userId) return this.claimModel.find({ userId }).exec();
    return this.claimModel.find().exec();
  }
}