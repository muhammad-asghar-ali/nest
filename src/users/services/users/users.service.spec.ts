import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/user.entity';
import * as becryptUtiles from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<UserEntity>;

  const USER_REPO_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<UserEntity>>(USER_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  describe('create user', () => {
    it('should encoded password correctly', async () => {
      jest.spyOn(becryptUtiles, 'encodePassword').mockReturnValue('hash123');
      await service.createUser({
        username: 'test',
        email: 'test@email.com',
        password: '1234567',
      });

      expect(becryptUtiles.encodePassword).toHaveBeenCalledWith('1234567');
    });

    it('should call user repo, create with correct params', async () => {
      await service.createUser({
        username: 'test',
        email: 'test@email.com',
        password: '1234567',
      });

      expect(userRepo.create).toHaveBeenCalledWith({
        username: 'test',
        email: 'test@email.com',
        password: 'hash123',
      });
    });

    it('should call user repo, save the new user', async () => {
      jest.spyOn(userRepo, 'create').mockReturnValueOnce({
        id: 1,
        username: 'test',
        email: 'test@email.com',
        password: 'hash123',
      });
      await service.createUser({
        username: 'test',
        email: 'test@email.com',
        password: '1234567',
      });

      expect(userRepo.save).toHaveBeenCalledWith({
        id: 1,
        username: 'test',
        email: 'test@email.com',
        password: 'hash123',
      });
    });
  });
});
