import { Request, Response } from "express";
import { Permission } from "../../db/entity/permissions/Permission.entity";

class PermissionsController {

    async create(req: Request, res: Response) {

        try {
                
            const { name } = req.body;

            const exists = await Permission.findOne({ name });

            if( exists ) return res.status(500).json({ error: "Permiso ya existe"});

            const created = await Permission.create({ name }).save();

            if( !created ) return res.status(500).json({ error: "Permiso no pudo ser creado"});

            res.json({ created });

        } catch (error) {
            
            res.status(500).json({ error });
        }
    }

    async update(req: Request, res: Response) {

        try {
            
            const { id, name } = req.body;
            
            const permission = await Permission.findOne(id);
    
            if( !permission ) return res.status(500).json({ error: "Permiso no encontrado" });
    
            const updated = await Permission.update({
                id
            }, { name });
    
            if( !updated ) return res.status(500).json({ error: "Permiso no pudo ser modificado"});
    
            res.json({ updated });

        } catch (error) {
            
            res.status(500).json({ error });
        }
    }
    async getAll(req: Request, res: Response) {

        try {
            
            const allPermissions = await Permission.find();

            res.json( allPermissions );

        } catch (error) {

            res.status(500).json({ error });
            
        }
    }

    async getOne(req: Request, res: Response) {

        try {
            
            const { id } = req.params;
    
            const permission = await Permission.findOne(id);
    
            if( !permission ) return res.status(500).json({ error: "Permiso no encontrado" });
    
            res.json(permission);

        } catch (error) {
            
            res.status(500).json({ error });
        }

    }

    async delete(req: Request, res: Response) {

        try {
            
            const { id } = req.params;

            const deleted = await Permission.delete(id);

        } catch (error) {
            
            res.status(500).json({ error });

        }
    }

}

export default new PermissionsController();
