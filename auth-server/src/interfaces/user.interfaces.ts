import { IImage } from "./image.interface";
import {WithId} from "mongodb";


export interface IUser extends WithId<Document>{
    firstname:string,
    lastname:string,
    email:string;
    password:string
    role: string;
    created_at:Date,
    updated_at:null|Date
    image: IImage|null;

    comparePassword(password:string):boolean

}

export interface UserForm {
    firstname:string,
    lastname:string,
    email:string,
    password:string
}


export interface UserjwtToken {
    user:IUser|undefined,
    id:string|undefined,
}

