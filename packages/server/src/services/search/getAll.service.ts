import { SearchInfo } from "../../db/entity/search/SearchInfo.entity";
import { User } from "../../db/entity/users/User.entity";
import { IResponseGetAllSearch } from "../../interfaces/services/responses.interface";


export default async (accountDNI: string): Promise<IResponseGetAllSearch> => {

    try {

        const user = await User.findOne({DNI: accountDNI})

        if(!user) return { error: "Ha ocurrido un error"}
        
        const result = await SearchInfo.find({
            relations: ['entitySearched', 'riskMatrixResult', 'results', 'user'],
            where: {
                user: {
                    DNI: accountDNI
                }
            }
        })

        if(!result) return { error: "Ha ocurrido un error"}

        return { data: result }

    } catch (error) {
        console.log({error})

        return { error: "Ha ocurrido un error"}
    }
}