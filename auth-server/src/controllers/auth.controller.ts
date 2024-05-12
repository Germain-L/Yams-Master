import {NextFunction, Request, Response} from "express";
import {return400or500Errors} from "../utils";
import {UserService} from "../utils/services/userService";
import {MongoClient} from "mongodb";

export class AuthController {
    private userService: UserService;

    constructor(client: MongoClient) {
        this.userService = new UserService(client);
    }

    /*
     * POST /api/auth/login
     * Log-in a user using its credentials.
     */
    async login (req: Request, res: Response, _: NextFunction) {
        try {
            await (this.userService.loginUser(req.body))
                ? res.status(200).send({
                    status: "You're logged in.",
                    jwt: this.userService.jwtToken
                })
                : res.status(404).send({
                    field: ["error"],
                    message: ["L'email et/ou le mot de passe est incorrect"]
                })
        } catch (e) {
            return400or500Errors(e, res)
        }
    }

    /*
     * POST /api/auth/register
     * Allows to create account
     */
    async register (req: Request, res: Response, _: NextFunction) {
        try {
            await this.userService.createUser(req.body)

            res.status(200).send({
                status: "success",
                message: "User created."
            })
        } catch (e) {
            return400or500Errors(e, res)
        }
    }

    async logout (_req: Request, res: Response, _: NextFunction) {
        try {
            res.status(200).send({
                status: "success",
                message: "You're logged out."
            });
        } catch (error) {
            return400or500Errors(error, res)
        }
    }

    async me (req: Request, res: Response, _: NextFunction) {
        try {
            if (req.user) {
                res.status(200).send({
                    fisrtname: req.user.firstname,
                    lastname: req.user.lastname,
                    email: req.user.email
                });
            } else {
                res.status(404).send({
                    field: ["error"],
                    message: ["User not Found"]
                });
            }
        } catch (error) {
            return400or500Errors(error, res)
        }
    }
}
