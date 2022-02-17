import users from "./users"
import roles from "./roles"
import permissions from "./permissions"
import connectionDB from "..";
import { getConnection, Repository } from "typeorm"
import { User } from "../entity/users/User.entity";

export const seeds = async () => {
    connectionDB().then(async (connections) => {
        console.log({ connections })
        const connection = getConnection("default");
        const Role = connection.getRepository("Role");
        const User: Repository<User> = connection.getRepository("User");
        const Permission = connection.getRepository("Permission");

        await Promise.all(roles.map(async r => {
            try {
                const exists = await Role.findOne({ name: r.name });

                if (exists) return console.log(`Rol ${r.name} ya existe`);

                console.log({ r })
                const model = await Role.create(r);
                const created = await Role.save(model);
                if (!created) return console.log({ error: `No fue posible crear el Rol ${r.name}` });

                console.log(`Rol ${r.name} creado exitosamente`);

            } catch (error) {
                console.log({ error })
                console.log({ error: "Error desconocido" });
            }
        }))


        await Promise.all(permissions.map(async p => {
            try {

                const exists = await Permission.findOne({ name: p.name });

                if (exists) return console.log(`Permiso ${p.name} ya existe`);

                const created = await Permission.create(p);
                const saved = await Permission.save(created);

                if (!saved) return console.log({ error: `No fue posible crear el Permiso ${p.name}` });

                console.log(`Permiso ${p.name} creado exitosamente`);

            } catch (error) {
                console.log({ error })

                console.log({ error: "Error desconocido" });
            }
        }))


        await Promise.all(users.map(async u => {
            try {

                const validEmail = await User.findOne({ email: u.email });

                if (validEmail) return console.log(`Usuario ${u.email} ya existe`);

                const created: any = User.create(u);

                const adminRole = await Role.findOne({ name: "Admin" });

                if (!adminRole) return console.log({ error: "Rol admin no fué encontrado" });

                created.role = adminRole;

                const saved = await User.save(created);

                if (!saved) return console.log({ error: `No fue posible crear el usuario ${u.email}` });

                console.log(`Usuario ${u.email} creado exitosamente`);

            } catch (error) {
                console.log({ error })

                console.log({ error: "Error desconocido", errorCatch: error });
            }
        }));
    })

}

seeds()