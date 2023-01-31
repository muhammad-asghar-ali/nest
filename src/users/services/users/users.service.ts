import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      email: 'test@email.com',
      password: 'test',
    },
    {
      email: 'test1@email.com',
      password: 'test1',
    },
    {
      email: 'test2@email.com',
      password: 'test2',
    },
    {
      email: 'test3@email.com',
      password: 'test3',
    },
  ];

  // get all users exclude the password
  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUsersByInterceptor() {
    return this.users.map((user) => new SerializedUser(user));
  }

  // get one user
  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
