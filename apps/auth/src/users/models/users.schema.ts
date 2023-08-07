import { AbstractDocument } from "@app/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false})
export class UsersDocument extends AbstractDocument {
    @Prop()
    username: string;

    @Prop()
    password: string;

}

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);