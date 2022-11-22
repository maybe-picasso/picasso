import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않는 속성이 요청된 경우 응답으로 올바른 속성 타입을 안내한다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않는 속성이 요청된 경우 응답으로 잘못된 속성을 반환한다.
      transform: true, // DTO에 맞춰서 요청값의 타입을 변환한다.
    })
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
