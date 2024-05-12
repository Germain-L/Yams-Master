import {IImage} from "../interfaces";
import bcrypt from "bcrypt";

export class User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date | null;
    image: IImage | null;

    constructor(fistname: string, lastname: string, email: string, password: string, role: string) {
        this.firstname = fistname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = new Date();
        this.updated_at = null;
        this.image = null;
    }

    comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

}