import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private _svc: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._svc.findOne(username);
    if (user) {
      const matched = comparePassword(pass, user.password);
      if (!matched) {
        throw new HttpException('invalid password', HttpStatus.BAD_REQUEST);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
