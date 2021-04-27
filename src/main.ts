import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:4200', credentials: true }); //domeniul care apeleaza api-ul(se poate seta cookie-ul doar pe domeniul pus de mine, aici localhost)
  await app.listen(3000);
}
bootstrap();
