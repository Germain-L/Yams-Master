import { Router } from "express";
import {UserController} from "../controllers/user.controller"
import upload from '../config/image.config'

const router = Router();

import  {requireAuth,} from "../middleware/AuthMiddleware";
import {MongoClientConnector} from "../config/mongo.config";

router.post("/", requireAuth, async (req, res, next) => {
    const userController = new UserController(await MongoClientConnector.Instance.clientPromise);
    await userController.updateUser(req, res, next);
});

router.post("/avatar", requireAuth, upload.single("file"), async (req, res, next) => {
    const userController = new UserController(await MongoClientConnector.Instance.clientPromise);
    await userController.updateUserAvatar(req, res, next);
});

router.delete("/avatar", requireAuth, async (req, res, next) =>{
    const userController = new UserController(await MongoClientConnector.Instance.clientPromise);
    await userController.deleteUserAvatar(req, res, next);
});

export default router;