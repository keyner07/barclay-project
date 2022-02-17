import { SearchInfo } from "../../db/entity/search/SearchInfo.entity"


export default async (id: number) => {

    try {
        
        const data = await SearchInfo.findOne(id, {
            relations: ['entitySearched', 'riskMatrixResult', 'results', 'user', 'infoReceived']
        });

        if(!data) return { error: "Ninguna información fué encontrada" };

        return { data };

    } catch (error) {
        console.log({error})
        return { error: "Ha ocurrido un error" };
    }
}