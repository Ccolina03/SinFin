import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationsModule } from './reservations.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  //Validate request data and reject request if not meet the validation
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useLogger(app.get(Logger)) //pino logger
  const configService = app.get(ConfigService); //getting ConfigService to get .env prop for port. 
  await app.listen(configService.get('PORT'));
}
bootstrap();
