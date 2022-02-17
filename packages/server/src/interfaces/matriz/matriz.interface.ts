import { enumTiposMatriz } from "./matriz-enums";

export type IResultMatriz = {
    
    [key in enumTiposMatriz]: {
        found: boolean,
        value: number,
        level?: string 
    }

}