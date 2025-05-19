import {
  Controller,
  All,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller()
export class GatewayController {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  @All('checkin/*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['authorization'];
    const verifyUrl = this.config.get('AUTH_VERIFY_URL') || 'http://localhost:3001/auth/verify';
    const eventBaseUrl = this.config.get('EVENT_URL') || 'http://localhost:3002';

    try {
      const verifyRes: AxiosResponse = await firstValueFrom(
        this.httpService.post(verifyUrl, {}, { headers: { authorization: token } })
      );
      const userId = verifyRes.data.sub || verifyRes.data.userId || 'mock-user';

      const targetUrl = eventBaseUrl + req.url;

      const proxyRes: AxiosResponse = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: targetUrl,
          headers: { ...req.headers },
          data: { ...req.body, userId },
        })
      );

      res.status(proxyRes.status).send(proxyRes.data);
    } catch (err) {
      throw new HttpException('Unauthorized or Proxy error', HttpStatus.UNAUTHORIZED);
    }
  }
}
