import { Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { LoaclAuthGaurd } from 'src/auth/utils/local.gaurd';

@Controller('auth')
export class AuthController {
  @UseGuards(LoaclAuthGaurd)
  @Post('/login')
  async login() {}

  @Get()
  async getAuthSessiom(@Session() session: Record<string, any>) {
    console.log(session);
    return session;
  }
}
