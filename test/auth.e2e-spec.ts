import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getConnection } from 'typeorm';
import { SessionEntity } from '../src/typeorm/session.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    const sessionRepo = getConnection().getRepository(SessionEntity);
    app.use(
      session({
        name: 'Nest',
        secret: 'SADDASKSHKFAHKSADHAKDHSKJDHKSDHAKSD',
        resave: false,
        /**
         * Forces a session that is "uninitialized" to be saved to the store.
         * A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.
         * Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.
         */
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
        store: new TypeormStore({
          cleanupLimit: 10,
        }).connect(sessionRepo),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('authentication', () => {
    const URL = '/api/auth/login';
    let cookie = '';
    it('should login', (done) => {
      request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'test',
          password: '1234567',
        })
        .expect(201)
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
          console.log(res.headers);
          done();
        });
    });

    it('should visit /api/users and return 200', async () => {
      return await request(app.getHttpServer())
        .get('/api/users')
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
