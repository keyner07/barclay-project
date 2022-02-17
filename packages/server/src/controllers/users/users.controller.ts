import { Request, Response } from "express";
import { License } from "../../db/entity/license/License.entity";
import { LicenseUser } from "../../db/entity/license/LicenseUsers.entity";
import { Role } from "../../db/entity/roles/Role.entity";
import { User } from "../../db/entity/users/User.entity";
import tokenHelper from "../../helpers/token.helper";
import getAllWithInformationService from "../../services/admin/users/getAllWithInformation.service";

class UsersController {

    async login(req: Request, res: Response){

        try {
            
            const { email, password } = req.body;
    
            const user = await User.findOne({
                where: {
                    email
                },
                relations: ['role', 'matriz']
            });
            console.log({user})
            if( !user ) 
            return res.status(400).
            json({ error: "Acceso inválido, favor verificar email y contraseña" });
            
            // if( user.connected ) return res.status(500).json({ error: "Acceso inválido, favor verificar email y contraseña"}); Espera
            
            const passwordIsValid = user.comparePassword(password);
    
            
            if( !passwordIsValid ) 
            return res.status(400).
            json({ error: "Acceso inválido, favor verificar email y contraseña" });
            
            const token = tokenHelper.sign({
                DNI: user.DNI,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                lastConnection: user.lastConnection,
                nationality: user.nationality,
                role: user.role,
                entity: user.entity,
                registerCode: user.registerCode,
                locationId: user.locationId
            })

            res.json({ token });

        } catch (error) {
            console.log({error})
            res.status(500).json({ error, message: "Error desconocido" });
        }
    }

    async logout(req: Request, res: Response){

        try {

            const { DNI } = res.locals.authData;

            const user = await User.findOne({ DNI });

            

            if( !user ) return res.status(401).json({ error: "Invalid credentials" });

            user.connected = false;

            await user.save();
            res.json({true: true});
            
        } catch (error) {
            console.log({error})
            res.status(500).json({ error, message: "Error desconocido" })
        }
    }

    async register(req: Request, res: Response) {

        try {
            
            const payload: User = req.body;
    
            const user = await User.findOne({ email: payload.email });
    
            if( user ) return res.status(500).json({ error: "Email en uso" });
    
            payload.lastConnection = new Date()
            const created = await User.create(payload).save();
    
            if( !created ) return res.status(500).json({ error: "No fue posible crear el usuario" });
            const license = await License.findOne({
                where: {
                    uuid: req.body.licenseUUID
                }
            });
            const newRelation = await LicenseUser.create({
                lastPaymentReceived: new Date(),
                license,
                user,
                isActive: true
            }).save();
            
            res.json({ created });

        } catch (error) {
            console.log({ error })
            res.status(500).json({ message: "Error desconocido", error });
        }

    }

    async update(req: Request, res: Response) {

        try {
            console.log({tes: req.body});
            
            delete  req.body.role
            const { DNI } = req.params;
            
            let userData: User = req.body;
        
            let user = await User.findOne({ DNI });
    
            if( !user ) return res.status(500).json({ error: "Usuario no encontrado" });
            
            const updated = await User.update({
                DNI
            }, userData)
    
            if( !updated ) return res.status(500).json({ error: "Usuario no fué modificado" });
    
            res.json({ updated });

        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });
        }
    }

    async getAll(req: Request, res: Response) {

        try {
            
            const { skip, take } = req.query;

            const allUsers = await getAllWithInformationService(+`${skip || ""}`, +`${take || ""}`);

            if(allUsers.error) return res.status(500).json(allUsers);

            res.json(allUsers);

        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });
        }
    }

    async getOne(req: Request, res: Response) {

        try {
            
            const { DNI } = req.params;
    
            const user = await User.findOne({ DNI }, { relations: ["licensesRelation", "licensesRelation.payments", "role", "matriz"]});
    
            if( !user ) return res.status(500).json({ error: "Usuario no encontrado"});
    
            res.json({ user });

        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });
        }
    }

    async delete(req: Request, res: Response) {

        try {
            
            const { DNI } = req.params;

            const deleted = await User.delete({ DNI });

            res.json({ deleted });
        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });
        }
    }

    async addRole(req: Request, res: Response){

        try {
            
            const { userDNI, roleId } = req.body;

            const user = await User.findOne({
                where: {
                    DNI: userDNI
                },
                relations: ["role"]
            });

            if( !user ) return res.status(500).json({ error: "Usuario no encontrado" });

            const role = await Role.findOne(roleId);

            if( !role ) return res.status(500).json({ error: "Rol no encontrado" });

            user.role = role;

            const saved = await user.save();

            if( !saved ) return res.status(500).json({ error: "Rol no pudo ser agregado al usuario"});

            res.json({message: "Rol agregado exitósamente", user});

        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });

        }
    }

    async removeRole(req: Request, res: Response){

        try {
            
        } catch (error) {
            
            res.status(500).json({ error: "Error desconocido" });

        }
    }

    async addLicense(req: Request, res: Response){

        try {

            const { userId, licenseId } = req.body;

            if ( !userId || !licenseId ) return res.status(400).json({ error: "Usuario o Licencia invalida"})

            const user = await User.findOne(userId, { relations: ["licensesRelation"]});

            if( !user ) return res.status(500).json({ error: "Usuario no encontrado"});

            const license = await License.findOne(licenseId);

            if( !license ) return res.status(500).json({ error: "Licencia no encontrado"});

            const relationExists = await LicenseUser.findOne({
                license,
                user,
                isActive: true
            })

            if( relationExists ) return res.status(500).json({ error: "Usuario con licencia activa del mismo tipo"})
            const newRelation = await LicenseUser.create({
                lastPaymentReceived: new Date(),
                license,
                user,
                isActive: true
            }).save();
            
            res.json({newRelation})
        } catch (error) {
            
            res.status(500).json({ message: "Error desconocido", error });

        }
    }

    async toInactiveLicense(req: Request, res: Response){

        try {

            const { licenseRelationId } = req.params;

            if ( !licenseRelationId ) return res.status(400).json({ error: "Licencia invalida"})

            const license = await LicenseUser.findOne(licenseRelationId);

            if( !license ) return res.status(500).json({ error: "Licencia no encontrado"});

            license.isActive = false;

            license.save();
            
            res.json({message: "Licencia desactivada"})
        } catch (error) {
            
            res.status(500).json({ message: "Error desconocido", error });

        }
    }

}

export default new UsersController();
