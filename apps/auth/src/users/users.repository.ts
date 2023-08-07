import { AbstractRepository } from '@app/common';
import {Injectable, Logger} from '@nestjs/common'
import { UsersDocument } from './models/users.schema';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument>  {
    protected readonly logger = new Logger(UsersDocument.name);

    //When injecting Model we will inject token later on.
    constructor(
        @InjectModel(UsersDocument.name) userModel: Model<UsersDocument>
    ) {
        super(userModel); // 
    }
}