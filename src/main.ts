import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
import { ServerApiVersion } from 'mongodb';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
