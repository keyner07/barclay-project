import axios from "axios";
import config from "../../config";
import { CheerioProcessor } from "../cheerio";
import FormData from "form-data"
import querystring from "querystring";

class SanctionsProvider extends CheerioProcessor{

    async get(name: string){

        const data = this.getFormDataSanctions(name);

        const res = await axios.post(config.apiScrapping.sanctions.url, querystring.stringify(data));

        //@ts-ignore
        const htmlLoaded = this.process(res.data);

        const resultSearch = htmlLoaded(".ResultsDiv > div > table > tbody > tr > td > a");
        const listResult:any = []

        resultSearch.each((i:any, e: any) => {
            //@ts-ignore
            listResult.push({name: e.children[0].data, url: `${config.apiScrapping.sanctions.url}/${e.attribs.href}`})
        })

        return listResult
    }
    
    getFormDataSanctions = (name: string) => {

        return {
            '__VIEWSTATE': config.apiScrapping.sanctions.viewState,
            'ctl00$MainContent$txtLastName': name
        }
    }
}

export default new SanctionsProvider();