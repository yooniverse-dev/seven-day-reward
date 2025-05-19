import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Checkin } from './schema/checkin.schema';

@Injectable()
export class CheckinService {
  constructor(@InjectModel(Checkin.name) private checkinModel: Model<Checkin>) {}

  async markCheckin(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const exists = await this.checkinModel.findOne({ userId, date: today });
    if (exists) return { message: '이미 출석했습니다.' };

    const count = await this.checkinModel.countDocuments({ userId });
    const reward = this.getReward(count + 1);

    await this.checkinModel.create({ userId, date: today });

    return {
      day: count + 1,
      reward,
      message: `${count + 1}일차 출석 완료! 보상 지급.`,
    };
  }

  async getStatus(userId: string) {
    const count = await this.checkinModel.countDocuments({ userId });
    return {
      userId,
      checkinDays: count,
      remaining: Math.max(0, 7 - count),
      isEligibleForReward: count < 7,
    };
  }

  getReward(day: number) {
    const rewards = {
      1: { item: '포션', amount: 1 },
      2: { item: '골드', amount: 500 },
      3: { item: '강화석', amount: 1 },
      4: { item: 'EXP 부스터', amount: 1 },
      5: { item: '실버 상자', amount: 1 },
      6: { item: '골드 상자', amount: 1 },
      7: { item: '레전더리 상자', amount: 1 },
    };
    return (rewards as Record<number, { item: string; amount: number }>)[day] || {
      item: '기본 보상',
      amount: 1,
    };
  }
}
