import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, password: string, role: string) {
    return this.userModel.create({ username, password, role });
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
