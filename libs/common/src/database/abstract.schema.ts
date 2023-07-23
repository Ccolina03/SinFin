import { Prop, Schema} from '@nestjs/mongoose';
import {SchemaTypes, Types} from 'mongoose';

@Schema() 
export class AbstractDocument {
    //Prop to define property within the Mongoose Schema. Prop storing MongoDB unique identifier
    @Prop({type: SchemaTypes.ObjectId}) 
    _id: Types.ObjectId; //should store valid MongoDB ObjectId
}