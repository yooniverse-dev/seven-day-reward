import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import { RewardService } from './reward.service';
  import { AuthGuard } from '@nestjs/passport';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  
  @Controller('reward')
  export class RewardController {
    constructor(private readonly rewardService: RewardService) {}
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN', 'OPERATOR')
    @Post()
    async createReward(@Body() body: any) {
      return this.rewardService.createReward(body);
    }
  
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
    @Get()
    async findAll() {
      return this.rewardService.findAll();
    }
  }