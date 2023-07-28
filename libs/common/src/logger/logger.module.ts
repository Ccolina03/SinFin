import { Module } from '@nestjs/common';
import {LoggerModule as PinoLogModule} from 'nestjs-pino'

@Module({
    imports: [ PinoLogModule.forRoot({
        pinoHttp:{
          transport: {
            target: 'pino-pretty',
            options: {singleLine: true}
          }
        }
       })]

})
export class LoggerModule {}
