import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/user.notfound.exception';
import { HttpExceptionFilter } from 'src/users/filters/httpException.filter';
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
  @Get('/find/:email')
  getUserByEmail(@Param('email') email: string) {
    const user = this.userService.getUserByEmail(email);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return new SerializedUser(user);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) throw new UserNotFoundException();
    return new SerializedUser(user);
  }

  @Get('/filter/:id')
  @UseFilters(HttpExceptionFilter)
  getUserByIdFilter(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) throw new UserNotFoundException();
    return new SerializedUser(user);
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
