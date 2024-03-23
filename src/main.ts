import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });
  app.enableCors();
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
