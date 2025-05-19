import { Controller, Post, Get, Req } from '@nestjs/common';
import { CheckinService } from './checkin.service';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post()
  async checkin(@Req() req: any) {
    const userId = req.user?.id || 'mock-user'; // 실제 환경에서는 Gateway에서 검증된 userId 받아옴
    return this.checkinService.markCheckin(userId);
  }

  @Get('status')
  async status(@Req() req: any) {
    const userId = req.user?.id || 'mock-user';
    return this.checkinService.getStatus(userId);
  }

  @Get('rewards')
  getRewards() {
    return {
      1: { item: '포션', amount: 1 },
      2: { item: '골드', amount: 500 },
      3: { item: '강화석', amount: 1 },
      4: { item: 'EXP 부스터', amount: 1 },
      5: { item: '실버 상자', amount: 1 },
      6: { item: '골드 상자', amount: 1 },
      7: { item: '레전더리 상자', amount: 1 },
    };
  }
}
