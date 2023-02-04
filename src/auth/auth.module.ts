import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/user.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
