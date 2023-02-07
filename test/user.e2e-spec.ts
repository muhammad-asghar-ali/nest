import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('create user', () => {
    const URL = '/api/users/create';
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'test',
          password: '1234567',
          email: 'test@email.com',
        })
        .expect(201);
    });

    it('should return a 400 invalid username is provided', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'te',
          password: '1234567',
          email: 'test@email.com',
        })
        .expect(400);
    });

    it('should return a 400 invalid password is provided', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'teest',
          password: '123',
          email: 'test@email.com',
        })
        .expect(400);
    });

    it('should return a 400 invalid email is provided', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'teest',
          password: '1234567',
          email: 'test',
        })
        .expect(400);
    });
  });
});
