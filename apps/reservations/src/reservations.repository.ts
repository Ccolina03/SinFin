import { AbstractRepository } from "@app/common";
import {Injectable, Logger} from '@nestjs/common'
import { ReservationDocument } from "./models/reservations.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationRepository.name);

    constructor(
        //inject the model from Mongoose which will be used to manipulate the documents
        @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
    ) {
        //calling super to pass in the to the reservation document
        super(reservationModel);
    }
}   