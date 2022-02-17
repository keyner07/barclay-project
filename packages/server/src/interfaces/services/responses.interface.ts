import { ISearchInfo } from "../search/search.interface";

export interface IError {
    error?: string
}

export interface IResponseGetAllSearch extends IError {
    data?:  ISearchInfo[]
}