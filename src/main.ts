import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, {logger: console,});
  app.enableCors();
  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}

bootstrap();
