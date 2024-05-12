import { Router } from "express";
import  auth from "./auth.routes";
import user from "./user.routes"


const router = Router()

router.use("/api/auth", auth);
router.use("/api/user", user);
export default router;