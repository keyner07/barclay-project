import { EntitySearched } from "../../db/entity/search/EntitySearched.entity";
import { ResultFound } from "../../db/entity/search/Results.entity";
import { RiskMatrixResults } from "../../db/entity/search/RiskMatrixResult.entity";
import { User } from "../../db/entity/users/User.entity";
import { IError } from "../services/responses.interface";

export interface IProfileData {
    fullName: string
    nacionality: string
    birthday: Date
    gender:  string
    civilState: string
    address: string
    calificacion: string
    points: string
    img: string
}
export interface IResultSearch {
    title: string
    date: string
    description: string
    address: string
    formattedUrl: string
}

export interface ISearchInfo {
    
    id: number;

    uuid: string

    entitySearched?: EntitySearched

    riskMatrixResult?: RiskMatrixResults;

    results?: ResultFound[];

    user?: User;

    createdAt?: Date;
}

export interface IGetGoogleRes extends IError {

    data?: Array<ResultFound>
    count?: string
}

export interface IFormPersonaJuridica {
    razonSocial: string
    RNC: string
    numMercantil: string
    country: string
    fechaConstitucionDomicilio: string
    telefono: string
    descripcionNegocio: string
    principalesAccionistas: string
    representantesLegales: string
    copiaDelPoderRepresentacion: string
    email: string
    PEP: string
    user: User
}