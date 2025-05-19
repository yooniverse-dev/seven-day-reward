import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ClaimService } from './claim.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

interface JwtUser {
  id?: string;
  userId?: string;
  role?: string;
  [key: string]: any;
}

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async request(
    @Req() req: Request & { user?: JwtUser },
    @Body('eventId') eventId: string,
  ) {
    const userId = req.user?.id || req.user?.userId || 'mock-user';
    return this.claimService.requestReward(userId, eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyClaims(@Req() req: Request & { user?: JwtUser }) {
    const userId = req.user?.id || req.user?.userId || 'mock-user';
    return this.claimService.getClaims(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'OPERATOR', 'AUDITOR')
  @Get()
  async getClaims(@Query('userId') userId?: string) {
    return this.claimService.getClaims(userId);
  }
}