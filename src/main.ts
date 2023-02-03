import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // pre fix /api to every route
  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
