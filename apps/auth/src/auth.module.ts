import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';
import { LocalStrategy } from './local-strategy/local.strategy';

@Module({
  imports: [UsersModule, 
  LoggerModule,
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './apps/auth/.env',
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
      PORT: Joi.number().required(),
    })
  }),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
      const jwtSecret = configService.get<string>('JWT_SECRET');
      console.log('JWT Secret:', jwtSecret); // Log the JWT_SECRET
      return {
        secret: jwtSecret,
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      };
    },
    inject: [ConfigService],//injecting ConfigService to useFactory
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
