import { Report } from "../../db/entity/reports/Reports.entity"
import { SearchInfo } from "../../db/entity/search/SearchInfo.entity";
import { EnumTypeReports } from "../../interfaces/reportes/reportes.enum";
import { IROSReport } from "../../interfaces/reportes/reportes.interfaces"

export default async (type: EnumTypeReports, payload: IROSReport, searchId: number) => {

    try {

        const saving = await Report.create({
            payload,
            searchId,
            type
        }).save();

        if (!saving) return { error: "Error procesando el reporte" };

        return { data: saving }

    } catch (error) {

        console.log({error});

        return { error: "Error procesando el reporte"};
    }
}