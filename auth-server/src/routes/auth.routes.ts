import { Router } from "express";
import  {requireAuth,notRequireAuth} from "../middleware/AuthMiddleware";
import {AuthController} from "../controllers/auth.controller";
import {MongoClientConnector} from "../config/mongo.config";

const router = Router();

router.post("/login", notRequireAuth, async (req, res, next) => {
    const authController = new AuthController(await MongoClientConnector.Instance.clientPromise);
    await authController.login(req, res, next)
});


router.get("/logout", requireAuth, async (req, res, next) => {
    const authController = new AuthController(await MongoClientConnector.Instance.clientPromise);
    await authController.logout(req, res, next)
});


router.get("/me", requireAuth, async (req, res, next) => {
    const authController = new AuthController(await MongoClientConnector.Instance.clientPromise);
    await authController.me(req, res, next)
});

router.post("/register",notRequireAuth, async (req, res, next) => {
    const authController = new AuthController(await MongoClientConnector.Instance.clientPromise);
    await authController.register(req, res, next)
});

export default router;