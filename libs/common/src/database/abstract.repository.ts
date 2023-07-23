// IDEA: common repo from which other microservices can extend from and use common CRUD operations from our database
import { Logger } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { Model, Types} from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    //nestjs js commong logger to make repo create to use CRUD methods
    //protected which allows sub repo classes to have access to them and allow any custom functionality 
    //Logger is not initialized so subclasses will provide own implem. of logger
    protected abstract readonly logger: Logger;
    
    // model = actual Mongoose model based on TDocument that repo will pass in to the AbstractRepo and will use model to do CRUD operations
    constructor(protected readonly model: Model<TDocument>) {}
        
    //omit _id since we will generate it when creating in MongoDB
    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        
        //new document instance created using model with new _id and document props
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })

        //save() returns a promise after succesfully storing in database 
        //once promise is resolved, toJson converts Mongoose document to JS object without mongoose props
        //as unknows allows TS to treat result as changed to unknown type, as TDocument asserts object is TDocument type
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }
    
}