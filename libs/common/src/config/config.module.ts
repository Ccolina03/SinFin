import { Module } from '@nestjs/common';
import {ConfigService, ConfigModule as NestConfigModule} from '@nestjs/config'

@Module({
    imports: [NestConfigModule.forRoot()],
    providers: [ConfigService], //informing nestjs the module provides this and is available using injection
    exports: [ConfigService], //subset of providers that should be available
})
export class ConfigModule {}
