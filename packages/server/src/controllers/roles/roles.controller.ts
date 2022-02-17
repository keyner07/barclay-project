import { Request, Response } from "express";
import { Role } from "../../db/entity/roles/Role.entity";

class RolesController {

    async create(req: Request, res: Response) {

        try {
            
            const { name } = req.body;
    
            const exists = await Role.findOne({ name });
    
            if( exists ) return res.status(500).json({ error: "Rol ya existe" });
    
            const created = await Role.create({ name }).save();
    
            if( !created ) return res.status(500).json({ error: "Error creando el rol"});
    
            res.json({ newRole: created });

        } catch (error) {
    
            return res.status(500).json({ error });

        }

    }

    async update(req: Request, res: Response) {

        try {
            
            const { name, id } = req.body;
    
            const role = await Role.findOne({ id });
    
            if( !role ) return res.status(500).json({ error: "Rol no encontrado"});
    
            role.name = name;
    
            const updated = await role.save();
    
            if( !updated ) return res.status(500).json({ error: "No se pudo modificar el rol" });
    
            res.json({ updated })

        } catch (error) {
            
            return res.status(500).json({ error });
        }

    }
    async getAll(req: Request, res: Response) {

        try {
            
            const allRoles = await Role.find();

            return res.json({ allRoles });

        } catch (error) {

            return res.status(500).json({ error });

        }
        
    }

    async getOne(req: Request, res: Response) {

        try {
            
            const { id } = req.params;
    
            const role = await Role.findOne(id);
    
            if( !role ) return res.status(500).json({ error: "Rol no encontrado"})

            return res.json(role);

        } catch (error) {
            
            return res.status(500).json({ error });
        }
    }

    async delete(req: Request, res: Response) {

        try {
            
            const { id } = req.params;

            const role = await Role.delete(id);

            return res.json({ deleted: role });

        } catch (error) {

            return res.status(500).json({ error });
            
        }
    }
}

export default new RolesController();
