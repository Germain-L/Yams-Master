import {IUser} from "./user.interfaces";

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser,
        isAuthenticated(): boolean
    }
}