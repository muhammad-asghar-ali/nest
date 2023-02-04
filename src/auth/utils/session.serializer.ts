import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/types';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.userService.getUserByIdDb(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
