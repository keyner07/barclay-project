import { Request, Response } from "express";
import { unlink, unlinkSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { generateReport } from "../../helpers/reports.helper";
import { EnumTypeReports } from "../../interfaces/reportes/reportes.enum";
import { IROSReport } from "../../interfaces/reportes/reportes.interfaces";
import createService from "../../services/reports/create.service";


class ReportsController {

    async saveROSReport(req: Request, res: Response) {

        const { searchId } = req.params;
        const { data } = req.body

        let payload: IROSReport = data;

        if (!payload) return res.status(500).json({ error: "Data is required" })

        try {

            const saveReport = await createService(EnumTypeReports.ROS, payload, +searchId);

            if (saveReport.error) return res.status(500).json(saveReport);

            payload.numberReport = payload.numberReport2 = `${saveReport.data.id}`;

            const creatingPdf = await generateReport(payload, "ros");

            if (creatingPdf.error) return res.status(500).json(creatingPdf);

            const fileName = `reporte-ros-${payload.numberReport}.pdf`;
            const path = `public/docs/${fileName}`;

            writeFileSync(path, creatingPdf.file);

            res.status(200).download(path);

            // unlinkSync(path);

        } catch (error) {

            console.log({ error })

            return res.status(500).json({ error: "Ha ocurrido un error" })
        }
    }
    
    async saveRTEReport(req: Request, res: Response) {

        const { searchId } = req.params;
        const { data } = req.body

        let payload: IROSReport = data;

        if (!payload) return res.status(500).json({ error: "Data is required" })

        try {

            const saveReport = await createService(EnumTypeReports.RTE, payload, +searchId);

            if (saveReport.error) return res.status(500).json(saveReport);

            payload.numberReport = payload.numberReport2 = `${saveReport.data.id}`;

            const creatingPdf = await generateReport(payload, "rte");

            if (creatingPdf.error) return res.status(500).json(creatingPdf);

            const fileName = `reporte-rte-${payload.numberReport}.pdf`;
            const path = `public/docs/${fileName}`;

            writeFileSync(path, creatingPdf.file);

            res.status(200).download(path);

            // unlinkSync(path);

        } catch (error) {

            console.log({ error })

            return res.status(500).json({ error: "Ha ocurrido un error" })
        }
    }
}

const reportsController = new ReportsController();
export default reportsController;