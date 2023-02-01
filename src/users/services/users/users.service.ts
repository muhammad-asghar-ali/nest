import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'test@email.com',
      password: 'test',
    },
    {
      id: 2,
      email: 'test1@email.com',
      password: 'test1',
    },
    {
      id: 3,
      email: 'test2@email.com',
      password: 'test2',
    },
    {
      id: 4,
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

  // get user by id
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
