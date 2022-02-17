import axios from "axios";
import config from "../../config";
import { IGetGoogleRes } from "../../interfaces/search/search.interface";

const { url, apiKey, cx } = config.google;

class GoogleProvider {

    async get(search: string, offset: string = "1"){

        try {
            
            const res = await axios.get(`${url}?key=${apiKey}&cx=${cx}&exactTerms="${search}"&lowRange=true&start=${offset}`)

            //@ts-ignore
            return { data: res.data.items, count: res.data.searchInformation.totalResults };

        } catch (error) {
            console.log({error})
            return { error: "Ha ocurrido un error", data: [] }
        }
    }
}

export default new GoogleProvider();