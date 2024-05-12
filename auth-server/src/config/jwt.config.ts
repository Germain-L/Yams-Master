import { NextFunction, Response } from "express";
import {JwtPayload} from "jsonwebtoken";
import {JwtService} from "../utils/services/jwtService";
import {UserService} from "../utils/services/userService";
import {return400or500Errors} from "../utils";
import {Request} from "express-serve-static-core";
import {MongoClientConnector} from "./mongo.config";

const jwtService = new JwtService();

export const extractUserFromToken = async (req:Request, res:Response, next:NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const userService = new UserService(await MongoClientConnector.Instance.clientPromise);
        try {
            const decodedTokenCheck = await jwtService.decodeJwtToken(token)
            const userInfo = await userService.checkUserExist(decodedTokenCheck.sub as string)

            /*
             * Get the id of the user in the JWT token and check if it exists in database
             *  If it's not exist throw 404 errors
             */

            req.user = userInfo
            next();

        } catch (error) {
            return400or500Errors(error, res)
        }
    } else {
        next();
    }
}

export const addJwtFeatures = (req:Request, _res:Response, next:NextFunction) => {
    // req.isAuthenticated = () => !!req.user
    req.isAuthenticated = () => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            return !!processJwtToken(token)
        }
        return false
    }
    next()
};

async function processJwtToken(token: string): Promise<JwtPayload | string> {
    return await jwtService.decodeJwtToken(token)
}