import { RiskMatrixResults } from "../../../db/entity/search/RiskMatrixResult.entity";
import { Matriz } from "../../../db/entity/matriz/matriz.entity";
import getValuesService from "./getValues.service";
import { IResultMatriz } from "../../../interfaces/matriz/matriz.interface";

export default async (data: IResultMatriz | {}, riskMatrix: [Matriz]) => {
    if (!riskMatrix) return { error: "Cannot calc value of Risk Matrix" };
    try {
        let finalValue = 0;

        riskMatrix.forEach((item) => {
            console.log({ item });
        });

        Object.keys(data).forEach((item) => {
            console.log(item);
            riskMatrix.forEach((itemMatriz: any) => {
                const matriz = itemMatriz.find((x) => x.tipo_riesgo == item);
                data[item].value = matriz.valor_riesgo;
                if (data[item].found) {
                    finalValue = finalValue + matriz.valor_riesgo;
                }
            });
        });

        console.log({ data, riskMatrix, finalValue });

        return { finalValue, data };
    } catch (error) {
        console.log({ error });
        return { error: "Cannot calc value of Risk Matrix" };
    }
};
