import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(username: string, password: string, role: string) {
    const existing = await this.userService.findByUsername(username);
    if (existing) throw new BadRequestException('이미 존재하는 사용자입니다.');
    await this.userService.createUser(username, password, role);
    return { message: '등록 완료' };
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    const payload = { sub: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return { access_token: token };
  }

  async verify(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }
}
