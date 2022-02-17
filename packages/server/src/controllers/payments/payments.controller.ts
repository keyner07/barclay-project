import { validate } from "class-validator";
import { Request, Response } from "express";
import { License } from "../../db/entity/license/License.entity";
import { LicenseUser } from "../../db/entity/license/LicenseUsers.entity";
import { Payment } from "../../db/entity/payment/Payment.entity";
import { User } from "../../db/entity/users/User.entity";
import { CreateDTO } from "../../interfaces/payment/Create.dto";


class PaymentController {

    async create(req: Request, res: Response) {

        let paymentData: CreateDTO = req.body;

        validate(paymentData).then(error => {
            console.log({ error })
            if (error.length > 0) {
                res.status(400).json({ error })
            }
        })

        const { licenseId } = req.query;
        const { authData } = res.locals;

        if (!licenseId) return res.status(400).json({ error: "Licensa es requerida" })

        const paymentCreated = await Payment.create(paymentData).save();

        if (!paymentCreated) return res.status(500).json({ error: "Error guardando el pago" });

        const license = await License.findOne(+licenseId);
        const user = await User.findOne({ DNI: authData.DNI });

        if (!license) return res.status(500).json({ error: "Licencia no encontrada" })
        if (!user) return res.status(500).json({ error: "User no encontrado" })

        if (paymentCreated.amount < license.price) return res.status(500).json({ error: "El monto pagado es menor que el precio de la licencia" })
        let licenseUser = await LicenseUser.findOne({
            where: {
                license,
                user,
                isActive: true
            },
            relations: ["payments"]
        })

        if (!licenseUser) {
            licenseUser = await LicenseUser.create({
                lastPaymentReceived: paymentCreated.createdAt,
                user,
                license,
                isActive: true,
                payments: [paymentCreated]
            }).save()
        } else {
            licenseUser.lastPaymentReceived = paymentCreated.createdAt
            licenseUser.payments = [...licenseUser.payments, paymentCreated]
            await licenseUser.save()
        }

        if (!licenseUser) return res.status(500).json({ error: "No se pudo asociar la licencia al usuario" })

        return res.json({ paymentCreated })
    }

    async getByLicenseUserId(req: Request, res: Response) {

        try {

            const { id } = req.params;

            if (!id) return res.status(400).json({ error: "La licencia es requerida" });

            const license = await LicenseUser.findOne(+id, {
                relations: ["payments"]
            });

            if (!license) return res.status(500).json({ error: "Licencia no encontrada" });

            return res.json({ payments: license.payments })

        } catch (error) {

            return res.status(500).json({ error })
        }
    }

    async getAll(req: Request, res: Response) {

        const { skip, take } = req.query;

        try {

            const allPayments = await Payment.find(
                {
                    ...(take ? {skip: +skip, take: +take} : {}),
                    relations: ["license"]
                });

            res.json({ allPayments })

        } catch (error) {

            res.status(500).json({ error });
        }
    }

    async getByTransactionId(req: Request, res: Response) {

        try {

            const { transactionId } = req.params;

            if (!transactionId) return res.status(400).json({ error: "TransactionId es requerido" });

            const payment = await Payment.findOne({ transactionId: +transactionId }, { relations: ["license"] });

            if (!payment) return res.status(500).json({ error: "Pago no encontrado" });

            res.json({ payment });

        } catch (error) {

            res.status(500).json({ error });
        }
    }

}

export default new PaymentController();