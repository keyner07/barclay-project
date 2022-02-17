import { Role } from "../../db/entity/roles/Role.entity";


export interface SignTokenDTO {
    DNI: string
    firstName: string
    lastName: string
    nationality: string
    email: string
    lastConnection: Date
    role: Role
    entity: string
    registerCode: string
    locationId: string
}