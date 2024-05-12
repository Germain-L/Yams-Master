import {IImage} from '../../interfaces';
import {AbstractDao} from "./abstract.queries";
import {MongoClient} from "mongodb";

export class ImageDao extends AbstractDao<IImage> {

    constructor(client: MongoClient) {
        super(client, "image");
    }

}


