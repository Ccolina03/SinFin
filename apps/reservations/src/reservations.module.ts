import { Module } from '@nestjs/common'
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationRepository } from './reservations.repository';
import { DatabaseModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservations.schema';
import { LoggerModule } from 'nestjs-pino';

@Module({
  //In the object we provide the name which is the injection token that we used to inject this model so can be found in ReservationRepository 
  //in the object we also provide the ReservationSchema
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema}]),
   LoggerModule.forRoot({
    pinoHttp:{
      transport: {
        target: 'pino-pretty',
        options: {singleLine: true}
      }
    }
   })],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository]
})
export class ReservationsModule {}
