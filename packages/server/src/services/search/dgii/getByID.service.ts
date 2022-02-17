import { createReadStream, readFileSync } from "fs";
import path, { join } from "path";
import storageFiles from "../../../storage";
import { getData } from "../../../storage/dgii.storage";

export default (term: string) => {
    try {
        const _dgiiFile = storageFiles.get("dgii");

        if (!_dgiiFile) return { error: "Cannot get dgii data" };

        const dgiiFile = _dgiiFile.toString().split("\n");

        const match = dgiiFile.find((e) => e.includes(term));

        if (!match) return null;

        const fixedToArray = match.replace("�", "x").split("|");

        return {
            cedulaRNC: fixedToArray[0],
            razonSocial: fixedToArray[1],
            nombreComercial: fixedToArray[2],
            regimenDePagos: fixedToArray[10],
            estado: fixedToArray[9],
            fecha: fixedToArray[8],
            actividad: `${fixedToArray[3]}...`,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
