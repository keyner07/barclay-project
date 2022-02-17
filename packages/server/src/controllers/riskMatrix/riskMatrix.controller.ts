import { Request, Response } from "express";
import { Matriz } from "../../db/entity/matriz/matriz.entity";
import { User } from "../../db/entity/users/User.entity";

export class RiskMatrixController {
    async update(req: Request, res: Response) {
        try {
            const { DNI } = res.locals.authData;

            const newData: Matriz = req.body;

            const data = await User.findOne({ DNI }, { relations: ["matriz"] });

            if (!data) return res.status(500).json({ error: "User not found" });

            const model = { ...data.matriz, ...newData };

            const updated = await Matriz.update(data.matriz.id, model);

            console.log({ updated });

            res.json(updated);
        } catch (error) {
            console.log({ error });

            res.json({ error: "Cannot update risk matrix" });
        }
    }

    async getOne(req: Request, res: Response) {
        const { DNI } = res.locals.authData;

        const data = await User.findOne({ DNI }, { relations: ["riskMatrix"] });

        return res.json(data.matriz);
    }
    async addOrCreateRiskMatriz(req: Request, res: Response) {
        try {
            const user = await User.findOne({
                where: {
                    DNI: res.locals.authData.DNI,
                },
                relations: ["matriz"],
            });
            const model: Matriz = req.body;

            const getMatriz = await Matriz.findOne({
                where: {
                    user: user,
                    tipo_riesgo: model.tipo_riesgo,
                },
            });

            if (!user) return res.status(500).json({ info: "Ha ocurrido un error" });
            console.log({ getMatriz, model: model });

            if (!getMatriz) {
                model.user = user;

                const newMatriz = await Matriz.create(model).save();

                if (!newMatriz) return res.status(500).json({ info: "No se ha podido actualizar la matriz de riesgo" });

                return res.json({ info: "se ha actualizado la matriz de riesgo" });
            }
            const resultMerge = Matriz.merge(getMatriz, model);

            console.log({ resultMerge });

            await resultMerge.save();

            if (!resultMerge) return res.status(500).json({ info: "No se ha podido actualizar la matriz de riesgo" });

            res.json({ info: "se ha actualizado la matriz de riesgo" });
        } catch (error) {
            console.log({ error });

            return res.status(500).json({ info: "No se ha podido actualizar la matriz de riesgo" });
        }
    }

    async listByUserLogIn(req: Request, res: Response) {
        try {
            const user = await User.findOne({
                where: {
                    DNI: res.locals.authData.DNI,
                },
                relations: ["matriz"],
            });

            return res.json(user.matriz);
        } catch (error) {
            console.log({ error });

            return res.status(500).json({ error: "Ha ocurrido un error, favor de ponerse en contacto el desarrollador" });
        }
    }
}

export default new RiskMatrixController();
