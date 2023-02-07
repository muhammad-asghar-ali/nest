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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../../auth/utils/local.gaurd';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UserNotFoundException } from '../../exceptions/user.notfound.exception';
import { HttpExceptionFilter } from '../../filters/httpException.filter';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';

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
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('interceptor')
  getUsersByInterceptor() {
    return this.userService.getUsersByInterceptor();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('find/:email')
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

  @Get('filter/:id')
  @UseFilters(HttpExceptionFilter)
  getUserByIdFilter(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user) throw new UserNotFoundException();
    return new SerializedUser(user);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('find')
  findOne(@Body() username: string) {
    return this.userService.findOne(username);
  }
}
