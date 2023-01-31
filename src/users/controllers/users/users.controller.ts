import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @Get()
  getUser() {
    return this.userService.getUsers();
  }

  // using Interceptors
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('interceptor')
  getUsersByInterceptor() {
    return this.userService.getUsersByInterceptor();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    const user = this.userService.getUserByEmail(email);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return new SerializedUser(user);
  }
}
