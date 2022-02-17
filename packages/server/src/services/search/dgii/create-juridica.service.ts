import { JuridicaSearch } from "../../../db/entity/search/juridicaSearch.entity";
import { User } from "../../../db/entity/users/User.entity";
import { IFormPersonaJuridica } from "../../../interfaces/search/search.interface";

export default async (data: IFormPersonaJuridica) => {
    try {
        const searchJuridica = await JuridicaSearch.create(data).save();

        return { searchJuridica };
    } catch (error) {
        console.log("🚀 ~ file: create-juridica.service.ts ~ line 18 ~ error", error);
        return { error };
    }
};
