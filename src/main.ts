import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  // Set global route prefix
  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
})();
