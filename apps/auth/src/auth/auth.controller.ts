import { Controller, Post, Body, Headers } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string; role?: string }) {
    const { username, password, role = 'USER' } = body;
    await this.userService.createUser(username, password, role);
    return { message: '등록 완료' };
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Post('verify')
  verify(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Bearer 토큰
    return this.authService.verify(token);
  }
}
