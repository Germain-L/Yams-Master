import {ImageDao} from "../database/dao/image.queries";
import {MongoClient, ObjectId} from "mongodb";


export class ImageController {

    imageDao: ImageDao

    constructor(client: MongoClient) {
        this.imageDao = new ImageDao(client);
    }

    async newImage (file: Express.Multer.File) {
        try {
            return await this.imageDao.create({path:file.filename})
        } catch (e) {
            throw e
        }
    }

    async delete (id: ObjectId) {
        try {
            return await this.imageDao.delete(id);
        } catch (e) {
            throw e
        }
    }
}