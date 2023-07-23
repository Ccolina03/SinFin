import { Module } from '@nestjs/common';
import {ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    //async configuration. forRoot is sync.
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        //Access useFactory by injecting ConfigService
        //allows to generate config objects based on specs, performs async taks, and inject other services
        useFactory: (ConfigService: ConfigService) => ({
            uri: ConfigService.get('MONGODBURI')
        }),
        inject: [ConfigService], //dependencies to to be injected into the useFactory
    })
    
    
    ]
})
export class DatabaseModule {}
