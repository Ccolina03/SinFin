// IDEA: common repo from which other microservices can extend from and use common CRUD operations from our database
import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { Model, Types, FilterQuery, UpdateQuery} from "mongoose";

//Key point: MongoDB knows method does certain thing from name of methods called
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

    //filterQuery = query criteria for finding the document
    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        //lean= return document as plain JS object rather than Mongoose. No Hydration
        const document = await this.model.findOne(filterQuery, {}, {lean: true}); //fields not specified so entire document returned 

        if (!document) {
            this.logger.warn("Document was not found with", filterQuery);
            throw new NotFoundException("Document not Found") //HTTP STATUS CODE SET TO 404 automatically
        }
        return document; //return document if found
    }
    
    //Not return anything void.
    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ){
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,  //unhydrated document
            new: true, //to return the newly updated document not the old one
        })

        if (!document) {
            this.logger.warn("Document was not found with", filterQuery);
            throw new NotFoundException("Document not Found") //HTTP STATUS CODE SET TO 404 automatically
        }
        return document; //return document if found
    }


    //returns array of TDocuments 
    //Goal: now when using find method on extended microservice it will receive an array of TDocument objects that match given query criteria
    async find (filterQuery: FilterQuery<TDocument>) {
        return this.model.find(filterQuery, {}, {lean: true} );
    }

    //returns null if not found. If not returns Document deleted
    async findOneAndDelete (filterQuery: FilterQuery<TDocument>) {
        return this.model.findOneAndDelete(filterQuery, {lean:true} )
    }

}