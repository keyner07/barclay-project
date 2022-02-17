import { FindManyOptions } from "typeorm";
import { LicenseUser } from "../../db/entity/license/LicenseUsers.entity"

export default async (filter: FindManyOptions<LicenseUser> = {}) => {

    try {

        const data = await LicenseUser.find(filter);

        return { data };

    } catch (error) {
        console.log({ error });

        return { error: { message: "Cannot get pending licenses" } };
    }
}