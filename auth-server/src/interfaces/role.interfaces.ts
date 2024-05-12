import {WithId} from "mongodb";

export interface IRole extends WithId<Document>{
    name : string
}