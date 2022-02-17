import { Request, Response } from "express";
import { License } from "../../db/entity/license/License.entity";
import getLicenseService from "../../services/licenses/getAll.service";

class LicensesController {

    async create(req: Request, res: Response) {

        try {
            
            const { name, price, durationDays } = req.body;
    
            if(!name || !price || !durationDays ) return res.status(500).json({error: "Campos inválidos"});
            const exists = await License.findOne({ name });
    
            if( exists ) return res.status(500).json({ error: "Licencia ya existe" });
    
            const created = await License.create({ name, price, durationDays }).save();
    
            if( !created ) return res.status(500).json({ error: "Error creando el licencia"});
    
            res.json({ newLicense: created });

        } catch (error) {
    
            return res.status(500).json({ error });

        }

    }

    async update(req: Request, res: Response) {

        try {
            
            const { id } = req.params;
            const data = req.body;

            if( !data ) return res.status(500).json({ error: "Ningun dato fué recibido"});

    
            const license = await License.findOne({ id: +id });
    
            if( !license ) return res.status(500).json({ error: "Licencia no encontrada"});
    
            const updated = await License.update(+id, data);
            
            if( !updated ) return res.status(500).json({ error: "No se pudo modificar el licencia" });
    
            res.json({ updated })

        } catch (error) {
            
            return res.status(500).json({ error });
        }

    }
    async getAll(req: Request, res: Response) {

        try {
            
            const allLicenses = await License.find();

            return res.json({ allLicenses });

        } catch (error) {

            return res.status(500).json({ error });

        }
        
    }

    async getOne(req: Request, res: Response) {

        try {
            
            const { id } = req.params;
    
            const license = await License.findOne(id);
    
            if( !license ) return res.status(500).json({ error: "Licencia no encontrada"})

            return res.json(license);

        } catch (error) {
            
            return res.status(500).json({ error });
        }
    }

    async delete(req: Request, res: Response) {

        try {
            
            const { id } = req.params;

            const license = await License.delete(id);

            return res.json({ deleted: license });

        } catch (error) {

            return res.status(500).json({ error });
            
        }
    }

    async getPending(req: Request, res: Response){

        const { offset, limit } = req.query;

        const result = await getLicenseService({
            where: {
                fewDaystoFinish: true,
                isActive: true
            },
            skip: +`${offset || 0}` * +`${limit || 0}`,
            take: +`${limit || 0}`,
            relations: ["user", "license"]
        });

        res.status(result.error ? 500 : 200).json(result);
    }
    
}


export default new LicensesController();