import {IImage, IUser} from "../../interfaces";
import {AbstractDao} from "./abstract.queries";
import {MongoClient, ObjectId} from "mongodb";

export class UserDao extends AbstractDao<IUser>{
    constructor(client: MongoClient) {
        super(client, "user");
    }

    async findUserPerEmail(email: string):Promise<IUser> {
        return await this.findOne({ "email": email });
    }

    async findUserPerId(idUser: string): Promise<IUser> {
        return await this.findOneById(new ObjectId(idUser));
    }

    async updateUserWithUserId(userId: ObjectId, user: IUser): Promise<IUser> {
        return await this.update(userId, user);
    }

    async updateUserAvatarWithUserId(userId: ObjectId, image: IImage): Promise<IUser> {
        return await this.update(userId, image);
    }

    async deleteImageWithUserId(userId: ObjectId): Promise<IUser> {
        return await this.update(userId, {image: null});
    }
}
