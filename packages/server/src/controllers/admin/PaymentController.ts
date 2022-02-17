import { Request, Response } from "express";
import dashboardStatsService from "../../services/admin/payment/dashboardStats.service";

class PaymentController {

    dashboardStats = async (req: Request, res: Response) => {

        try {

            const startLastMonth = new Date();
            startLastMonth.setDate(1);

            const endLastMonth = new Date()
            endLastMonth.setDate(1);
            endLastMonth.setDate(endLastMonth.getDate() - 1);

            const resultLastMonth = await dashboardStatsService({
                start: startLastMonth,
                end: endLastMonth
            });

            if(resultLastMonth.error) return res.status(500).json(resultLastMonth);

            const start = new Date();
            start.setDate(1);

            const resultNow = await dashboardStatsService({
                start,
                end: new Date()
            });
            
            if(resultNow.error) return res.status(500).json(resultNow);

            const endCalc = {
                amountPaid: {
                    cant: resultNow.data.amountPaid,
                    percent: (() => {
                        const rest = resultNow.data.amountPaid - resultLastMonth.data.amountPaid
                        if (!rest) return 0;

                        return (rest / 100) * resultLastMonth.data.amountPaid;
                    })()
                },
                cantPayments: {
                    cant: resultNow.data.cantPayments,
                    percent: (() => {
                        const rest = resultNow.data.cantPayments - resultLastMonth.data.cantPayments
                        if (!rest) return 0;

                        return (rest / 100) * resultLastMonth.data.cantPayments;
                    })()
                },
                users: {
                    cant: resultNow.data.users,
                    percent: (() => {
                        const rest = resultNow.data.users - resultLastMonth.data.users
                        if (!rest) return 0;

                        return (rest / 100) * resultLastMonth.data.users;
                    })()
                },
                querys: {
                    cant: resultNow.data.querys,
                    percent: (() => {
                        const rest = resultNow.data.querys - resultLastMonth.data.querys
                        if (!rest) return 0;

                        return (rest / 100) * resultLastMonth.data.querys;
                    })()
                }
            }

            return res.json({ data: endCalc });

        } catch (error) {
            console.log({ error });

            return res.status(500).json({ error: "Cannot get stats data"})
        }
    }

}

export default new PaymentController();