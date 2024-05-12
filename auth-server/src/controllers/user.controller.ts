import {NextFunction, Request, Response} from "express";
import {userInfoValidation} from "../database/validation/user.validation";
import * as fs from 'fs';
import {return400or500Errors} from "../utils";
import {UserDao} from "../database/dao/user.queries";
import {ImageController} from "./image.controller";
import {MongoClient} from "mongodb";

export class UserController {
    userDao: UserDao
    imageController: ImageController

    constructor(client: MongoClient) {
        this.userDao = new UserDao(client);
        this.imageController = new ImageController(client);
    }

    async updateUser (req: Request, res: Response, _: NextFunction) {
        try {

            await userInfoValidation.validateAsync(req.body, {abortEarly: false});

            const newUser = await this.userDao.updateUserWithUserId(req.user._id, req.body);
            if (newUser) {
                res.status(200).json({
                    "status": "success",
                    "userInfo": process.env.API_HOSTNAME + "/api" + process.env.API_VERSION + "/auth/me"
                });
            } else {
                res.status(500).send({
                    field: ["error"],
                    message: ["An error was occurred. Please contact us."]
                });
            }
        } catch (e) {
            return400or500Errors(e, res)
        }
    }

    async updateUserAvatar (req: Request, res: Response, _: NextFunction) {
        try {
            const file = req.file as Express.Multer.File
            if (file) {
                if (req.user.image) {
                    fs.unlinkSync("public/image/" + req.user.image.path);
                    await this.imageController.delete(req.user.image._id)
                }
                const image = await this.imageController.newImage(file)
                const newImageUser = await this.userDao.updateUserAvatarWithUserId(req.user._id, image)
                if (image && newImageUser) {
                    res.status(200).json({
                        "status": "success",
                        "userInfo": process.env.API_HOSTNAME + "/api" + process.env.API_VERSION + "/auth/me"
                    });
                } else {
                    res.status(500).send({
                        field: ["error"],
                        message: ["An error was occurred. Please contact us."]
                    });
                }
            } else {
                res.status(400).send({
                    field: ["error"],
                    message: ["The file attribute is not found"]
                });
            }
        } catch (e) {
            return400or500Errors(e, res)
        }
    }

    async deleteUserAvatar (req: Request, res: Response, _: NextFunction) {
        try {

            const image = req.user.image
            if (image) {
                const newUser = await this.userDao.deleteImageWithUserId(req.user._id)

                fs.unlinkSync("public/image/" + image.path);

                await this.imageController.delete(image._id);

                if (newUser) {
                    res.status(200).send({
                        "type": "success",
                        "message": "File deleted"
                    });
                } else {
                    res.status(500).send({
                        field: ["error"],
                        message: ["An error was occurred. Please contact us."]
                    });
                }
            } else {
                res.status(404).send({
                    field: ["error"],
                    message: ["Image not found. Please Add image before."]
                });
            }

        } catch (e) {
            return400or500Errors(e, res)
        }
    }
}
