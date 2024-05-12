import {WithId} from "mongodb";

export interface IImage extends WithId<Document>{
    path : String
}

export interface ImageForm {
    path : String
}