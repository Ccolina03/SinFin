import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  //Validate request data ane reject request if not meet the validation
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger)) //pino logger
  await app.listen(3000);
}
bootstrap();
