import { AbstractDocument } from "@app/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

//Idea: Extends from Abstracts so has _id and the following properties of reservation
@Schema({ versionKey: false})
export class ReservationDocument extends AbstractDocument{
    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;
 
    @Prop()
    timeStamp: Date;

    @Prop()
    userId: string; 
     //ReservationDocument associated to userId
    @Prop()
    preferredName: string;
    @Prop()
    stopId: string; //stop will have more things to add and own microservice later on
    @Prop()
    billId: string; //bill will have its own microservice too
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument)