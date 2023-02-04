import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getConnection } from 'typeorm';
import { SessionEntity } from './typeorm/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });
  const sessionRepo = getConnection().getRepository(SessionEntity);
  // pre fix /api to every route
  app.setGlobalPrefix('api');
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
  await app.listen(5000);
}
bootstrap();
