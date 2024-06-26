import {NextFunction,Request, Response} from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).send({field: ["error"], message: "Bad token. You must to logged in before"});
    }
};

export const notRequireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(304).send();
    }
};
