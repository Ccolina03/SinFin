import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule as NestConfigModule} from '@nestjs/config'
import * as Joi from 'joi';

@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGODBURI: Joi.string().required(), //required and string .env var
        })
    })],
    providers: [ConfigService], //informing nestjs the module provides this and is available using injection
    exports: [ConfigService], //subset of providers that should be available
})
export class ConfigModule {}
