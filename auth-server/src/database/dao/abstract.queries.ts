import {Collection, Document, MongoClient, ObjectId} from "mongodb";
import {HttpError} from "../../utils/HttpError";

export class AbstractDao<T>{

    private database: Collection<Document>

    public constructor (client: MongoClient, collectionName: string) {
        this.database = client.db(process.env.MONGODB_DATABASE as string).collection(collectionName);
    }

    public async findOne(data: any): Promise<T> {
        const result = await this.database.findOne(data) as unknown as T;

        if(result){
            return result;
        }

        throw new HttpError(500, "Une erreur est survenue lors de la récupération de l'élément");
    }

    public async findOneById(id: ObjectId): Promise<T> {
        const result = await this.findOne({ _id: id }) as unknown as T;

        if(result){
            return result;
        }

        throw new HttpError(500, "Une erreur est survenue lors de la récupération de l'élément avec l'id " + id);
    }

    public async create(data: any): Promise<T> {

        const newImage = (await this.database.insertOne(data)) as unknown as T

        if(newImage){
            return newImage;
        }

        throw new HttpError(500, "Une erreur est survenue lors de la création de l'élément");
    }

    public async update(id: ObjectId, data: any): Promise<T> {
        await this.findOneById(id);

        const resultUpdate = await this.database.findOneAndUpdate({_id: id }, data, {}) as unknown as T;

        if(resultUpdate){
            return resultUpdate;
        }

        throw new  HttpError(500, "Une erreur est survenue lors de la MAJ de l'élément")
    }

    public async delete(id: ObjectId): Promise<T> {

        const result = await this.database.deleteOne(id) as unknown as T;

        if(result){
            return result;
        }

        throw new HttpError(500, "Une erreur est survenue lors de la suppression de l'élément")
    }

}