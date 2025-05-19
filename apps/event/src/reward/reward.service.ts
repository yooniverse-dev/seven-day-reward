import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './schema/reward.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
  ) {}

  async createReward(data: any): Promise<Reward> {
    return this.rewardModel.create(data);
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().exec();
  }
}