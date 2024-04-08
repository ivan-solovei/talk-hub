import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PROD_PORT || process.env.LOCAL_PORT;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
