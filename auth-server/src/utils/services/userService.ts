import {IUser, UserForm} from "../../interfaces";
import {userSignupValidation} from "../../database/validation/user.validation";
import {JwtService} from "./jwtService";
import {UserDao} from "../../database/dao/user.queries";
import {MongoClient} from "mongodb";
import {User} from "../../dto/User";
import bcrypt from "bcrypt";

const jwtService = new JwtService()

export class UserService{
    jwtToken: string;

    userDao: UserDao;

    constructor(client: MongoClient) {
        this.jwtToken = "";
        this.userDao = new UserDao(client);
    }

    async createUser(body: UserForm){
        await userSignupValidation.validateAsync(body, {abortEarly: false});

        try {
            const salt = await bcrypt.genSalt(10);
            body.password =  await bcrypt.hash(body.password, salt);
        } catch (e) {
            throw e;
        }

        await this.userDao.create(new User(body.firstname, body.lastname, body.email, body.password, "User"));

    }

    async loginUser(body: IUser){
        const userEntity = await this.userDao.findUserPerEmail(body.email);

        if (userEntity) {
            const user = new User(userEntity.firstname, userEntity.lastname, userEntity.email, userEntity.password, userEntity.role)
            const match = user.comparePassword(body.password);
            if (match) {

                const jwtToken = jwtService.createJwtToken({user: userEntity, id: undefined})
                this.jwtToken = jwtToken
                return true
            }
        }
        return false
    }

    async checkUserExist(userId: string) {
        return await this.userDao.findUserPerId(userId);
    }
}