import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserEntity } from 'src/typeorm/user.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class UsersModule {}
