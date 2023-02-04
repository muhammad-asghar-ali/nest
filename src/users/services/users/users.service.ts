import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/typeorm/user.entity';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // inject the entity

  constructor(
    @InjectRepository(UserEntity) private _svc: Repository<UserEntity>,
  ) {}

  private users: User[] = [
    {
      id: 1,
      username: 'test',
      email: 'test@email.com',
      password: 'test',
    },
    {
      id: 2,
      username: 'test',
      email: 'test1@email.com',
      password: 'test1',
    },
    {
      id: 3,
      username: 'test',
      email: 'test2@email.com',
      password: 'test2',
    },
    {
      id: 4,
      username: 'test',
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

  // create user to db
  async createUser(userDetails: CreateUserDto) {
    // hash password
    const password = encodePassword(userDetails.password);
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that are present in entity schema.
     */
    const user = await this._svc.create({ ...userDetails, password });
    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     */
    return this._svc.save(user);
  }

  // get one user
  public async findOne(username: string) {
    const user = await this._svc.findOne({
      where: username as FindOptionsWhere<UserEntity>,
    });
    return user;
  }

  getUserByIdDb(id: number) {
    return this._svc.findOne({
      where: id as FindOptionsWhere<UserEntity>,
    });
  }
}
