import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // fails requests with unwanted key/values in params
      whitelist: true, // unwanted or invalid properties automatically removed
      transform: true, // transforms plain JSON object into instances of DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
